package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.model.ProductImage;
import lombok.Builder;

@Builder
public record ProductImageResponseDto(
        Long seq,
        String productImagePath,
        Integer productImageOrder
) {
    public static ProductImageResponseDto from(ProductImage productImage) {
        return ProductImageResponseDto.builder()
                .seq(productImage.getSeq())
                .productImagePath(productImage.getProductImagePath())
                .productImageOrder(productImage.getProductImageOrder())
                .build();
    }
}
