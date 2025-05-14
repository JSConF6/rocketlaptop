package com.jsconf.rocketlaptop.domain.cart.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItem {
    private Long seq;
    private Long cartSeq;
    private Long productSeq;
    private Integer quantity;
    private Integer unitPrice;
    private Integer totalPrice;
}
