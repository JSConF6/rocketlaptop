package com.jsconf.rocketlaptop.domain.auth.dto.request;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.member.model.UserProvider;
import com.jsconf.rocketlaptop.domain.member.model.UserRole;
import com.jsconf.rocketlaptop.domain.member.model.UserStatus;
import lombok.Builder;

@Builder
public record SignUpRequestDto(
        String email,
        String password,
        String name
) {
    public Member toMember(String encPassword) {
        return Member.builder()
                .email(email)
                .password(encPassword)
                .name(name)
                .provider(UserProvider.LOCAL)
                .role(UserRole.USER)
                .status(UserStatus.ACTIVE)
                .build();
    }
}
