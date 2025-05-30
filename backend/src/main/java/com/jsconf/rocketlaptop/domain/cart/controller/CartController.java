package com.jsconf.rocketlaptop.domain.cart.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.cart.dto.request.AddProductToCartRequestDto;
import com.jsconf.rocketlaptop.domain.cart.service.CartService;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.security.annotation.LoginMember;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;

    @PostMapping
    public ResponseEntity<?> addProductToCart(
            @LoginMember Member member,
            @RequestBody AddProductToCartRequestDto addProductToCartRequestDto
    ) {
        cartService.addCartItem(member, addProductToCartRequestDto);
        return ResponseUtil.success(SuccessCode.SUCCESS);
    }

    @GetMapping
    public ResponseEntity<?> getCartItems(@LoginMember Member member) {
        return ResponseUtil.success(SuccessCode.SUCCESS, cartService.getCartItems(member));
    }

    @DeleteMapping("/{cartItemSeq}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemSeq) {
        cartService.deleteCartItem(cartItemSeq);
        return ResponseUtil.success(SuccessCode.SUCCESS);
    }
}
