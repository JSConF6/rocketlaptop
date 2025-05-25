package com.jsconf.rocketlaptop.security.oauth2.dto;

public record KakaoUserInfoDto (
        Long id,
        KakaoAccount kakao_account
) {
    public record KakaoAccount (
            String email,
            Profile profile
    ) {
        public record Profile(String nickname) {}
    }
}
