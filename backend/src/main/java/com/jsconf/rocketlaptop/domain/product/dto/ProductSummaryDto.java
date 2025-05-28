package com.jsconf.rocketlaptop.domain.product.dto;

import com.jsconf.rocketlaptop.domain.product.model.ProductStatus;

public record ProductSummaryDto (
        Long seq,
        String productName,
        String categoryName,
        Integer price,
        Integer quantity,
        ProductStatus status,
        String productImagePath
) { }
