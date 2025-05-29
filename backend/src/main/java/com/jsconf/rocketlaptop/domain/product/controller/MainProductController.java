package com.jsconf.rocketlaptop.domain.product.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.product.service.ProductService;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main/products")
public class MainProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getMainPageProducts() {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                productService.getMainPageProducts()
        );
    }
}
