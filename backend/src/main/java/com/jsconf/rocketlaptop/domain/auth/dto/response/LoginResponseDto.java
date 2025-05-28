package com.jsconf.rocketlaptop.domain.auth.dto.response;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.member.model.UserRole;
import lombok.Builder;

@Builder
public record LoginResponseDto(
        Long seq,
        String email,
        String name,
        UserRole role,
        String accessToken,
        String refreshToken,
        Long accessTokenExpiresIn
) {
    public static LoginResponseDto from(Member member, String accessToken, String refreshToken, Long accessTokenExpiresIn) {
        return LoginResponseDto.builder()
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
