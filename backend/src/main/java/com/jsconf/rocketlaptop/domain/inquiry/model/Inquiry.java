package com.jsconf.rocketlaptop.domain.inquiry.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Inquiry {
    private Long seq;
    private Long memberSeq;
    private Long productSeq;
    private String title;
    private String question;
    private String answer;
    private InquiryStatus status;
    private Boolean isDeleted;
    private LocalDateTime answerDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
