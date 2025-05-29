package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.dto.MainPageProductDto;
import lombok.Builder;

import java.util.List;

@Builder
public record GetProductsResponseDto(
        int totalCount,
        List<MainPageProductDto> products
) {
    public static GetProductsResponseDto from(List<MainPageProductDto> products, int totalCount) {
        return GetProductsResponseDto.builder()
                .totalCount(totalCount)
                .products(products)
                .build();
    }
}
