package com.jsconf.rocketlaptop.domain.auth.dto.response;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import lombok.Builder;

@Builder
public record SocialLoginResponseDto(
        Long seq,
        String email,
        String name,
        String role,
        String accessToken,
        String refreshToken,
        Long accessTokenExpiresIn
) {
    public static SocialLoginResponseDto from(Member member, String accessToken, String refreshToken, Long accessTokenExpiresIn) {
        return SocialLoginResponseDto.builder()
                .seq(member.getSeq())
                .email(member.getEmail())
                .name(member.getName())
                .role(member.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .build();
    }
}
