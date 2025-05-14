package com.jsconf.rocketlaptop.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String secret,
        Expiration expiration
) {
    public record Expiration (Duration accessToken, Duration refreshToken) {}
}
