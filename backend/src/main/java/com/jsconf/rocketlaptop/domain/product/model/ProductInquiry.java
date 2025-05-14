package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProductInquiry {
    private Long seq;
    private Long memberSeq;
    private Long productSeq;
    private String title;
    private String question;
    private String answer;
    private ProductInquiryStatus status;
    private Boolean isPrivate;
    private Boolean isDeleted;
    private LocalDateTime answerDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
