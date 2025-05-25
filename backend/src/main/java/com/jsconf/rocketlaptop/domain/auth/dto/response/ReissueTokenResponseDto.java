package com.jsconf.rocketlaptop.domain.auth.dto.response;

import lombok.Builder;

@Builder
public record ReissueTokenResponseDto (
        String accessToken,
        String refreshToken,
        Long accessTokenExpiresIn
) {
    public static ReissueTokenResponseDto from (String accessToken, String refreshToken, Long accessTokenExpiresIn) {
        return ReissueTokenResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .build();
    }
}
