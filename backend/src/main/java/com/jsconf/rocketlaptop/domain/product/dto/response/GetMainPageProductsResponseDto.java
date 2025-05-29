package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.dto.MainPageProductDto;
import lombok.Builder;

import java.util.List;

@Builder
public record GetMainPageProductsResponseDto(
        List<MainPageProductDto> mainPageProducts
) {
    public static GetMainPageProductsResponseDto from(List<MainPageProductDto> mainPageProducts) {
        return GetMainPageProductsResponseDto.builder()
                .mainPageProducts(mainPageProducts)
                .build();
    }
}
