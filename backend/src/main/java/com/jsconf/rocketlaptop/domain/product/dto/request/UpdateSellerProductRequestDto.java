package com.jsconf.rocketlaptop.domain.product.dto.request;

import com.jsconf.rocketlaptop.domain.product.model.ProductImage;
import lombok.Builder;

import java.util.List;

@Builder
public record UpdateSellerProductRequestDto(
    UpdateSellerProduct product,
    List<ProductImageOrderDto> updateProductImages,
    List<Integer> deletedImageSeqs
) {
    public record ProductImageOrderDto (
            Long seq,
            Integer productImageOrder
    ) {
        public ProductImage toProductImage() {
            return ProductImage.builder()
                    .seq(seq)
                    .productImageOrder(productImageOrder)
                    .build();
        }
    }
}
