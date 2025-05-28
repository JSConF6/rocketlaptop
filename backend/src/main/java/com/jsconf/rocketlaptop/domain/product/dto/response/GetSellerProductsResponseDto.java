package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.dto.ProductSummaryDto;
import lombok.Builder;

import java.util.List;

@Builder
public record GetSellerProductsResponseDto (
        int totalCount,
        List<ProductSummaryDto> sellerProducts
) {
    public static GetSellerProductsResponseDto from(List<ProductSummaryDto> sellerProducts, int totalCount) {
        return GetSellerProductsResponseDto.builder()
                .totalCount(totalCount)
                .sellerProducts(sellerProducts)
                .build();
    }
}
