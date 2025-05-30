package com.jsconf.rocketlaptop.domain.cart.dto.response;

import com.jsconf.rocketlaptop.domain.cart.dto.CartItemDetail;
import lombok.Builder;

import java.util.List;

@Builder
public record GetCartItemsResponseDto(
        List<CartItemDetail> cartItems
) {
    public static GetCartItemsResponseDto from(final List<CartItemDetail> cartItems) {
        return GetCartItemsResponseDto.builder()
                .cartItems(cartItems)
                .build();
    }
}
