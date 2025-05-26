package com.jsconf.rocketlaptop.domain.product.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.product.service.SellerProductService;
import com.jsconf.rocketlaptop.security.annotation.LoginMember;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/products")
public class SellerProductController {
    private final SellerProductService productService;

    @GetMapping
    public ResponseEntity<?> getSellerProducts(@LoginMember Member member) {
        return ResponseUtil.success(SuccessCode.SUCCESS);
    }
}
