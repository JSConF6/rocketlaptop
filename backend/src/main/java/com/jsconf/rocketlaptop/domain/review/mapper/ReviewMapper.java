package com.jsconf.rocketlaptop.domain.review.mapper;

import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewDetailDto;
import com.jsconf.rocketlaptop.domain.review.dto.ProductReviewSearchCondition;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ProductReviewDetailDto> selectProductReviews(ProductReviewSearchCondition condition);
    Integer countProductReviews(ProductReviewSearchCondition condition);
}
