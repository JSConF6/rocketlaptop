package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Category {
    private Long seq;
    private String categoryName;
}
