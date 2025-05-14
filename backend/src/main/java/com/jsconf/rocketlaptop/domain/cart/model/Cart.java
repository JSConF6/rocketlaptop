package com.jsconf.rocketlaptop.domain.cart.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Cart {
    private Long seq;
    private Long memberSeq;
}
