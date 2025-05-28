package com.jsconf.rocketlaptop.domain.product.dto;

import com.jsconf.rocketlaptop.domain.product.model.Category;
import lombok.Builder;

@Builder
public record CategoryItem(
        Long seq,
        String categoryName
) {
    public static CategoryItem from(Category category) {
        return CategoryItem.builder()
                .seq(category.getSeq())
                .categoryName(category.getCategoryName())
                .build();
    }
}
