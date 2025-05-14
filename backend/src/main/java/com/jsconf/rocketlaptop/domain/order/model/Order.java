package com.jsconf.rocketlaptop.domain.order.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Order {
    private Long seq;
    private Long memberSeq;
    private String orderNumber;
    private Integer orderTotalPrice;
    private String recipientName;
    private String phoneNumber;
    private String postalCode;
    private String streetAddress;
    private String detailedAddress;
    private OrderStatus status;
    private LocalDateTime orderDate;
}
