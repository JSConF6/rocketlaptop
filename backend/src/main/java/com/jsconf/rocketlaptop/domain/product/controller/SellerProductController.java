package com.jsconf.rocketlaptop.domain.product.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import com.jsconf.rocketlaptop.domain.product.dto.request.CreateSellerProductRequestDto;
import com.jsconf.rocketlaptop.domain.product.dto.request.UpdateSellerProductRequestDto;
import com.jsconf.rocketlaptop.domain.product.service.SellerProductService;
import com.jsconf.rocketlaptop.security.annotation.LoginMember;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/products")
public class SellerProductController {
    private final SellerProductService sellerProductService;

    @GetMapping
    public ResponseEntity<?> getSellerProducts(
            @LoginMember Member member,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer categorySeq,
            @RequestParam Integer page,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                sellerProductService.findProductsBySeller(
                        ProductSearchCondition.of(
                                search, page, pageSize, member.getSeq(), status, categorySeq
                        )
                )
        );
    }

    @GetMapping("/{productSeq}")
    public ResponseEntity<?> getSellerProduct(
            @LoginMember Member member,
            @PathVariable Long productSeq
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                sellerProductService.findProductBySeller(member.getSeq(), productSeq)
        );
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createSellerProduct(
            @LoginMember Member member,
            @RequestPart("product") CreateSellerProductRequestDto productDto,
            @RequestPart("images") List<MultipartFile> images
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                sellerProductService.registerSellerProduct(member.getSeq(), productDto, images)
        );
    }

    @PutMapping(value = "/{productSeq}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateSellerProduct(
            @PathVariable Long productSeq,
            @LoginMember Member member,
            @RequestPart("updateProduct") UpdateSellerProductRequestDto updateProductDto,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                sellerProductService.updateSellerProduct(productSeq, member.getSeq(), updateProductDto, newImages)
        );
    }

    @DeleteMapping("/{productSeq}")
    public ResponseEntity<?> deleteSellerProduct(
            @LoginMember Member member, @PathVariable Long productSeq
    ) {
        sellerProductService.deleteSellerProduct(member.getSeq(), productSeq);
        return ResponseUtil.success(SuccessCode.SUCCESS);
    }
}
