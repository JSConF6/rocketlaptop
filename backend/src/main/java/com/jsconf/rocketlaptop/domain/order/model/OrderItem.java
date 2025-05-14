package com.jsconf.rocketlaptop.domain.order.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItem {
    private Long seq;
    private Long orderSeq;
    private Long productSeq;
    private Integer quantity;
    private Integer unitPrice;
    private Integer itemTotalPrice;
}
