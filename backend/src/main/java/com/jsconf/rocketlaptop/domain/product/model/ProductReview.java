package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProductReview {
    private Long seq;
    private Long productSeq;
    private Long memberSeq;
    private String content;
    private Integer starRating;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
