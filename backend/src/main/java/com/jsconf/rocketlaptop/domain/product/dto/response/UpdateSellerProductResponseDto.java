package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.model.Product;
import lombok.Builder;

@Builder
public record UpdateSellerProductResponseDto(
        Long productSeq
) {
    public static UpdateSellerProductResponseDto from(Product product) {
        return UpdateSellerProductResponseDto.builder()
                .productSeq(product.getSeq())
                .build();
    }
}
