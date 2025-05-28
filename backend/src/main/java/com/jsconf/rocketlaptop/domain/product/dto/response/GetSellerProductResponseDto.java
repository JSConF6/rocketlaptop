package com.jsconf.rocketlaptop.domain.product.dto.response;

import com.jsconf.rocketlaptop.domain.product.dto.ProductDetailDto;
import com.jsconf.rocketlaptop.domain.product.model.ProductStatus;
import lombok.Builder;

import java.util.List;

@Builder
public record GetSellerProductResponseDto(
        Long seq,
        Long categorySeq,
        String productName,
        Integer price,
        ProductStatus status,
        Integer quantity,
        String processor,
        String memory,
        String storage,
        String graphics,
        String display,
        String battery,
        String weight,
        String os,
        List<ProductImageResponseDto> productImages
) {
    public static GetSellerProductResponseDto from(ProductDetailDto productDetail, List<ProductImageResponseDto> productImages) {
        return GetSellerProductResponseDto.builder()
                .seq(productDetail.seq())
                .categorySeq(productDetail.categorySeq())
                .productName(productDetail.productName())
                .price(productDetail.price())
                .status(productDetail.status())
                .quantity(productDetail.quantity())
                .processor(productDetail.processor())
                .memory(productDetail.memory())
                .storage(productDetail.storage())
                .graphics(productDetail.graphics())
                .display(productDetail.display())
                .battery(productDetail.battery())
                .weight(productDetail.weight())
                .os(productDetail.os())
                .productImages(productImages)
                .build();
    }
}
