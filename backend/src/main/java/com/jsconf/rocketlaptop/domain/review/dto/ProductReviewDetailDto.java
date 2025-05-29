package com.jsconf.rocketlaptop.domain.review.dto;

import java.time.LocalDateTime;

public record ProductReviewDetailDto(
        Long seq,
        Long productSeq,
        Long memberSeq,
        String name,
        String content,
        Integer starRating,
        LocalDateTime createdAt
) { }
