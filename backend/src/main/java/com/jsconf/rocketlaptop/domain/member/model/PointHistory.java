package com.jsconf.rocketlaptop.domain.member.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PointHistory {
    private Long seq;
    private Long memberSeq;
    private TransactionType transactionType;
    private Integer pointAmount;
    private LocalDateTime createdAt;
}
