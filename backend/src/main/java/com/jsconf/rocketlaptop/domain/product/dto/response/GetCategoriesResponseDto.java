package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.dto.CategoryItem;
import lombok.Builder;

import java.util.List;

@Builder
public record GetCategoriesResponseDto(
        List<CategoryItem> categories
) {
    public static GetCategoriesResponseDto from(List<CategoryItem> categories) {
        return GetCategoriesResponseDto.builder()
                .categories(categories)
                .build();
    }
}
