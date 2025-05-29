package com.jsconf.rocketlaptop.domain.inquiry.dto;

import lombok.Builder;

@Builder
public record ProductInquirySearchCondition(
        Integer page,
        Integer pageSize,
        Integer offset,
        Long productSeq
) {
    public static ProductInquirySearchCondition of(Integer page, Integer pageSize, Long productSeq) {
        int safePage = Math.max(page, 1);
        int safePageSize = Math.max(pageSize, 1);
        return ProductInquirySearchCondition.builder()
                .page(safePage)
                .pageSize(safePageSize)
                .offset((safePage - 1) * safePageSize)
                .productSeq(productSeq)
                .build();
    }
}
