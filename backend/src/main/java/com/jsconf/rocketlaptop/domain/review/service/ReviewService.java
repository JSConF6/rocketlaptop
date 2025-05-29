package com.jsconf.rocketlaptop.domain.review.service;

import com.jsconf.rocketlaptop.domain.product.mapper.ProductMapper;
import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewDetailDto;
import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewSearchCondition;
import com.jsconf.rocketlaptop.domain.review.dto.response.GetProductReviewsResponseDto;
import com.jsconf.rocketlaptop.domain.review.mapper.ReviewMapper;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;
    private final ProductMapper productMapper;

    public GetProductReviewsResponseDto getProductReviews(ProductReviewSearchCondition condition) {
        if (!productMapper.existsByProductSeq(condition.productSeq()))
                throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND);
        List<ProductReviewDetailDto> productReviews = reviewMapper.selectProductReviews(condition);
        Integer totalProductReviewCount = reviewMapper.countProductReviews(condition);
        return GetProductReviewsResponseDto.from(productReviews, totalProductReviewCount);
    }
}
