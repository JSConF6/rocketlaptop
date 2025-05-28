package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.model.Product;
import lombok.Builder;

@Builder
public record CreateSellerProductResponseDto(
        Long productSeq
) {
    public static CreateSellerProductResponseDto from(Product product) {
        return CreateSellerProductResponseDto.builder()
                .productSeq(product.getSeq())
                .build();
    }
}
