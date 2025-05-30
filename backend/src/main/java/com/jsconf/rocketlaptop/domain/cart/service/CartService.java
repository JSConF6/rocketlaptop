package com.jsconf.rocketlaptop.domain.cart.service;

import com.jsconf.rocketlaptop.domain.cart.dto.CartItemDetail;
import com.jsconf.rocketlaptop.domain.cart.dto.request.AddProductToCartRequestDto;
import com.jsconf.rocketlaptop.domain.cart.dto.response.GetCartItemsResponseDto;
import com.jsconf.rocketlaptop.domain.cart.mapper.CartMapper;
import com.jsconf.rocketlaptop.domain.cart.model.Cart;
import com.jsconf.rocketlaptop.domain.cart.model.CartItem;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;

    @Transactional
    public void addCartItem(Member member, AddProductToCartRequestDto addProductToCartRequestDto) {
        try {
            Optional<Cart> cartOptional = cartMapper.selectByMemberSeq(member.getSeq());
            Cart cart = cartOptional.orElseGet(() -> {
                Cart savedCart = Cart.builder()
                        .memberSeq(member.getSeq())
                        .build();
                cartMapper.insertCart(savedCart);
                return savedCart;
            });
            Optional<CartItem> cartItemOptional = cartMapper.selectCartItem(addProductToCartRequestDto.toCartItem(cart));
            if (cartItemOptional.isPresent()) {
                CartItem cartItem =  cartItemOptional.get();
                cartItem.increaseQuantity(addProductToCartRequestDto.quantity());
                cartMapper.updateCartItem(cartItem);
            } else {
                CartItem cartItem = addProductToCartRequestDto.toCartItem(cart);
                cartMapper.insertCartItem(cartItem);
            }
        } catch (Exception e) {
            throw new ApiException(ErrorCode.ADD_CART_FAIL);
        }
    }

    public GetCartItemsResponseDto getCartItems(Member member) {
        List<CartItemDetail> cartItems = cartMapper.selectCartItems(member.getSeq());
        return GetCartItemsResponseDto.from(cartItems);
    }

    public void deleteCartItem(Long cartItemSeq) {
        if (!cartMapper.existsCartItem(cartItemSeq))
            throw new ApiException(ErrorCode.CART_ITEM_NOT_FOUND);
        cartMapper.deleteCartItem(cartItemSeq);
    }
}
