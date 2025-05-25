package com.jsconf.rocketlaptop.security.oauth2.provider;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.member.model.UserProvider;
import com.jsconf.rocketlaptop.domain.member.model.UserRole;
import com.jsconf.rocketlaptop.domain.member.model.UserStatus;
import com.jsconf.rocketlaptop.security.oauth2.dto.KakaoUserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class KakaoUserInfo implements OAuth2UserInfo {
    private KakaoUserInfoDto kakaoUserInfoDto;

    @Override
    public String getProviderId() {
        return getProvider().toLowerCase() + "_" + kakaoUserInfoDto.id();
    }

    @Override
    public String getProvider() {
        return UserProvider.KAKAO.toString();
    }

    @Override
    public String getEmail() {
        return kakaoUserInfoDto.kakao_account().email();
    }

    @Override
    public String getName() {
        return kakaoUserInfoDto.kakao_account().profile().nickname();
    }

    @Override
    public Member toModel(String encPassword) {
        return Member.builder()
                .email(getEmail())
                .password(encPassword)
                .name(getName())
                .provider(UserProvider.valueOf(getProvider()))
                .providerId(getProviderId())
                .role(UserRole.USER.toString())
                .status(UserStatus.PENDING_PHONE)
                .build();
    }

    public static KakaoUserInfo from(KakaoUserInfoDto dto) {
        return KakaoUserInfo.builder()
                .kakaoUserInfoDto(dto)
                .build();
    }
}
