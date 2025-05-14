package com.jsconf.rocketlaptop.domain.member.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberRole {
    private Long seq;
    private Long member_seq;
    private Long role_seq;
}
