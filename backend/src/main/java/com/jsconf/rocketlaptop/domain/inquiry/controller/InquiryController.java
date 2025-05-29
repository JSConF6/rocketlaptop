package com.jsconf.rocketlaptop.domain.inquiry.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquirySearchCondition;
import com.jsconf.rocketlaptop.domain.inquiry.service.InquiryService;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inquiries")
public class InquiryController {
    private final InquiryService inquiryService;

    @GetMapping("/products/{productSeq}")
    public ResponseEntity<?> getProductInquiries(
            @PathVariable Long productSeq,
            @RequestParam Integer page,
            @RequestParam(defaultValue = "5") Integer pageSize
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                inquiryService.getProductInquiries(
                        ProductInquirySearchCondition.of(page, pageSize, productSeq)
                )
        );
    }
}
