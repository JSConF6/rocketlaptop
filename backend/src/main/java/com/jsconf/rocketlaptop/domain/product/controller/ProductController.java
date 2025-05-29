package com.jsconf.rocketlaptop.domain.product.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import com.jsconf.rocketlaptop.domain.product.service.ProductService;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer categorySeq,
            @RequestParam Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                productService.getProducts(
                        ProductSearchCondition.of(
                                search, page, pageSize, categorySeq
                        )
                )
        );
    }

    @GetMapping("/{productSeq}")
    public ResponseEntity<?> getProduct(
            @PathVariable Long productSeq
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                productService.getProduct(productSeq)
        );
    }
}
