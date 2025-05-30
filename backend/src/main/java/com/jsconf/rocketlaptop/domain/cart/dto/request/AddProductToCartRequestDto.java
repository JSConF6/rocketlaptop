package com.jsconf.rocketlaptop.domain.cart.dto.request;

import com.jsconf.rocketlaptop.domain.cart.model.Cart;
import com.jsconf.rocketlaptop.domain.cart.model.CartItem;

public record AddProductToCartRequestDto(
        Long productSeq,
        Integer quantity,
        Integer unitPrice
) {
    public CartItem toCartItem(Cart cart) {
        return CartItem.builder()
                .cartSeq(cart.getSeq())
                .productSeq(productSeq)
                .quantity(quantity)
                .unitPrice(unitPrice)
                .totalPrice(quantity * unitPrice)
                .build();
    }
}
