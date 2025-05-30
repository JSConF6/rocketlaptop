package com.jsconf.rocketlaptop.domain.cart.dto;

public record CartItemDetail(
        Long seq,
        String productName,
        String productImagePath,
        String categoryName,
        Integer quantity,
        Integer unitPrice,
        Integer totalPrice
) { }
