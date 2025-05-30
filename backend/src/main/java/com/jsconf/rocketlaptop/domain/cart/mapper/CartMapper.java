package com.jsconf.rocketlaptop.domain.cart.mapper;

import com.jsconf.rocketlaptop.domain.cart.dto.CartItemDetail;
import com.jsconf.rocketlaptop.domain.cart.model.Cart;
import com.jsconf.rocketlaptop.domain.cart.model.CartItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CartMapper {
    Optional<Cart> selectByMemberSeq(Long memberSeq);
    Optional<CartItem> selectCartItem(CartItem cartItem);
    List<CartItemDetail> selectCartItems(Long memberSeq);
    boolean existsByMemberSeq(Long memberSeq);
    boolean existsCartItem(Long cartItemSeq);
    void insertCart(Cart cart);
    void insertCartItem(CartItem cartItem);
    void updateCartItem(CartItem cartItem);
    void deleteCartItem(Long cartItemSeq);
}
