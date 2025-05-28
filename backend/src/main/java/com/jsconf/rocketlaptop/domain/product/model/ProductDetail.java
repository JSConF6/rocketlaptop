package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ProductDetail {
    private Long seq;
    private Long productSeq;
    private String processor;
    private String memory;
    private String storage;
    private String graphics;
    private String display;
    private String battery;
    private String weight;
    private String os;
}
