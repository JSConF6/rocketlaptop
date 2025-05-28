package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductImage {
    private Long seq;
    private Long productSeq;
    private String productImagePath;
    private Integer productImageOrder;
}
