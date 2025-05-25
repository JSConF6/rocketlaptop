package com.jsconf.rocketlaptop.config.oauth;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.kakao")
public record KakaoProperties (
        String restApiKey,
        String clientSecret,
        String redirectUri,
        String tokenUri,
        String userInfoUri
) { }
