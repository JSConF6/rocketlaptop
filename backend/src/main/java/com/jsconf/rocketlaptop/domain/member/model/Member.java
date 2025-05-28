package com.jsconf.rocketlaptop.domain.member.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
public class Member {
    private Long seq;
    private String email;
    private String password;
    private String name;
    private UserStatus status;
    private UserProvider provider;
    private String providerId;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
