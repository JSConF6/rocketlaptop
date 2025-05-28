package com.jsconf.rocketlaptop.domain.product.dto;

import lombok.Builder;

@Builder
public record ProductSearchCondition (
        String search,
        Integer page,
        Integer pageSize,
        Integer offset,
        Long sellerSeq,
        String status,
        Integer categorySeq
) {
    public static ProductSearchCondition of(String search, Integer page, Integer pageSize, Long sellerSeq, String status, Integer categorySeq) {
        int safePage = Math.max(page, 1);
        int safePageSize = Math.max(pageSize, 1);
        return ProductSearchCondition.builder()
                .search(search)
                .page(safePage)
                .pageSize(safePageSize)
                .offset((safePage - 1) * safePageSize)
                .sellerSeq(sellerSeq)
                .status(status)
                .categorySeq(categorySeq)
                .build();
    }
}
