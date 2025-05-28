package com.jsconf.rocketlaptop.domain.auth.dto.request;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import lombok.Builder;

@Builder
public record LoginRequestDto(
        String email,
        String password
) {
    public Member toMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .build();
    }
}
