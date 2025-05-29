package com.jsconf.rocketlaptop.domain.review.dto.response;

import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewDetailDto;
import lombok.Builder;

import java.util.List;

@Builder
public record GetProductReviewsResponseDto(
        Integer totalProductReviewCount,
        List<ProductReviewDetailDto> productReviews
) {
    public static GetProductReviewsResponseDto from(List<ProductReviewDetailDto> productReviews, Integer totalProductReviewCount) {
        return GetProductReviewsResponseDto.builder()
                .totalProductReviewCount(totalProductReviewCount)
                .productReviews(productReviews)
                .build();
    }
}
