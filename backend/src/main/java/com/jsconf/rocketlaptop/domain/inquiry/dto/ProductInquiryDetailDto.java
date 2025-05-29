package com.jsconf.rocketlaptop.domain.inquiry.dto;

import com.jsconf.rocketlaptop.domain.inquiry.model.InquiryStatus;

import java.time.LocalDateTime;

public record ProductInquiryDetailDto(
        Long seq,
        String name,
        String question,
        String answer,
        InquiryStatus status,
        LocalDateTime answerDate,
        LocalDateTime createdAt
) { }
