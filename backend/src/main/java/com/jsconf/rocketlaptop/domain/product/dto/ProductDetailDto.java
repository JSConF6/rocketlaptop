package com.jsconf.rocketlaptop.domain.product.dto;

import com.jsconf.rocketlaptop.domain.product.model.ProductStatus;

public record ProductDetailDto(
        Long seq,
        Long categorySeq,
        String categoryName,
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
        String os
) { }