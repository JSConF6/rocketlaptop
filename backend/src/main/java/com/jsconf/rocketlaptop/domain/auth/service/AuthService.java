package com.jsconf.rocketlaptop.domain.auth.service;

import com.jsconf.rocketlaptop.config.oauth.KakaoProperties;
import com.jsconf.rocketlaptop.domain.auth.dto.request.ReissueTokenRequestDto;
import com.jsconf.rocketlaptop.domain.auth.dto.request.SocialLoginRequestDto;
import com.jsconf.rocketlaptop.domain.auth.dto.response.ReissueTokenResponseDto;
import com.jsconf.rocketlaptop.domain.auth.dto.response.SocialLoginResponseDto;
import com.jsconf.rocketlaptop.domain.member.mapper.MemberMapper;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.redis.RedisService;
import com.jsconf.rocketlaptop.security.jwt.JwtTokenProvider;
import com.jsconf.rocketlaptop.security.oauth2.dto.KakaoTokenDto;
import com.jsconf.rocketlaptop.security.oauth2.dto.KakaoUserInfoDto;
import com.jsconf.rocketlaptop.security.oauth2.provider.KakaoUserInfo;
import com.jsconf.rocketlaptop.security.oauth2.provider.OAuth2UserInfo;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RestClient restClient;
    private final MemberMapper memberMapper;
    private final RedisService redisService;
    private final KakaoProperties kakaoProperties;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private KakaoTokenDto getSocialAccessToken(String provider, String authorizeCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoProperties.restApiKey());
        params.add("redirect_uri", kakaoProperties.redirectUri()); // 인코딩 안 해도 됨
        params.add("code", authorizeCode);
        params.add("client_secret", kakaoProperties.clientSecret());

        return restClient.post()
                .uri(kakaoProperties.tokenUri())
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .body(params)
                .retrieve()
                .body(KakaoTokenDto.class);

    }

    private OAuth2UserInfo getSocialUserInfo(String provider, String accessToken) {
        KakaoUserInfoDto kakaoUserInfoDto = restClient.get()
                .uri(kakaoProperties.userInfoUri())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .body(KakaoUserInfoDto.class);
        return KakaoUserInfo.from(kakaoUserInfoDto);
    }

    private Member getOrRegisterMemberByEmail(OAuth2UserInfo oAuth2UserInfo) {
        String randomPassword = UUID.randomUUID().toString();
        String encPassword = passwordEncoder.encode(randomPassword);

        Optional<Member> memberOptional = memberMapper.findByEmail(oAuth2UserInfo.getEmail());
        return memberOptional.orElseGet(() -> {
            Member saveMember = oAuth2UserInfo.toModel(encPassword);
            memberMapper.save(saveMember);
            return saveMember;
        });
    }

    public SocialLoginResponseDto processSocialLogin(HttpServletResponse response, String provider, SocialLoginRequestDto socialLoginRequestDto) {
        KakaoTokenDto kakaoTokenDto = getSocialAccessToken(provider, socialLoginRequestDto.authorizeCode());
        OAuth2UserInfo oAuth2UserInfo = getSocialUserInfo(provider, kakaoTokenDto.access_token());
        Member member = getOrRegisterMemberByEmail(oAuth2UserInfo);
        String accessToken = jwtTokenProvider.generateAccessToken(member);
        String refreshToken = jwtTokenProvider.generateRefreshToken(member);

        redisService.setValues("Refresh:" + member.getSeq(), refreshToken, jwtTokenProvider.getRefreshTokenExpiration());

        return SocialLoginResponseDto.from(member, accessToken, refreshToken, jwtTokenProvider.getAccessTokenExpiration().getSeconds());
    }

    public ReissueTokenResponseDto reissueToken(ReissueTokenRequestDto reissueTokenRequestDto, HttpServletResponse response) {
        if (!StringUtils.hasText(reissueTokenRequestDto.refreshToken()))
            throw new ApiException(ErrorCode.EMPTY_TOKEN);

        jwtTokenProvider.validateToken(reissueTokenRequestDto.refreshToken());

        String userSeq = jwtTokenProvider.getSubject(reissueTokenRequestDto.refreshToken());
        String savedRefreshToken = redisService.getValues("Refresh:" + userSeq);
        if (!reissueTokenRequestDto.refreshToken().equals(savedRefreshToken))
            throw new ApiException(ErrorCode.INVALID_TOKEN);

        Member member = memberMapper.findBySeq(Long.parseLong(userSeq)).orElseThrow(
                () -> new ApiException(ErrorCode.USER_NOT_FOUND)
        );

        String newAccessToken = jwtTokenProvider.generateAccessToken(member);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(member);

        redisService.setValues("Refresh:" + userSeq, newRefreshToken, jwtTokenProvider.getRefreshTokenExpiration());

        return ReissueTokenResponseDto.from(newAccessToken, newRefreshToken, jwtTokenProvider.getAccessTokenExpiration().getSeconds());
    }

    public void logout(HttpServletRequest request) {
        String authorization = jwtTokenProvider.getAuthorizationHeader(request);
        String accessToken = jwtTokenProvider.getAccessToken(authorization);

        String memberSeq;
        try {
            memberSeq = jwtTokenProvider.getSubject(accessToken);
        } catch (ExpiredJwtException e) {
            memberSeq = e.getClaims().getSubject();
        }
        redisService.deleteValues("Refresh:" + memberSeq);
    }
}
