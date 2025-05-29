package com.jsconf.rocketlaptop.domain.review.dto;

import lombok.Builder;

@Builder
public record ProductReviewSearchCondition(
        Integer page,
        Integer pageSize,
        Integer offset,
        Long productSeq,
        String sortBy
) {
    public static ProductReviewSearchCondition of(Integer page, Integer pageSize, Long productSeq, String sortBy) {
        int safePage = Math.max(page, 1);
        int safePageSize = Math.max(pageSize, 1);
        return ProductReviewSearchCondition.builder()
                .page(safePage)
                .pageSize(safePageSize)
                .offset((safePage - 1) * safePageSize)
                .productSeq(productSeq)
                .sortBy(sortBy)
                .build();
    }
}
