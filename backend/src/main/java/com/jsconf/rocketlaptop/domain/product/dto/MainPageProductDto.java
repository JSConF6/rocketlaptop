package com.jsconf.rocketlaptop.domain.product.dto;

import lombok.Builder;

@Builder
public record MainPageProductDto(
        Long seq,
        String productName,
        String categoryName,
        String processor,
        String memory,
        String graphics,
        Integer price,
        String productImagePath
) { }
