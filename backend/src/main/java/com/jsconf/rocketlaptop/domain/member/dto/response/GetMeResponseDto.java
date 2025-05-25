package com.jsconf.rocketlaptop.domain.member.dto.response;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import lombok.Builder;

@Builder
public record GetMeResponseDto(
        Long seq,
        String email,
        String name,
        String role
) {
    public static GetMeResponseDto from(Member member) {
        return GetMeResponseDto.builder()
                .seq(member.getSeq())
                .email(member.getEmail())
                .name(member.getName())
                .role(member.getRole())
                .build();
    }
}
