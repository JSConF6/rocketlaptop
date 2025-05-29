package com.jsconf.rocketlaptop.domain.review.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewSearchCondition;
import com.jsconf.rocketlaptop.domain.review.service.ReviewService;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/products/{productSeq}")
    public ResponseEntity<?> getProductReviews(
            @PathVariable Long productSeq,
            @RequestParam Integer page,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam String sortBy
    ) {
        return ResponseUtil.success(SuccessCode.SUCCESS,
                reviewService.getProductReviews(
                        ProductReviewSearchCondition.of(page, pageSize, productSeq, sortBy)
                )
        );
    }

}
