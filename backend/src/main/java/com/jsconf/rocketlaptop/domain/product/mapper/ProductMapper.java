package com.jsconf.rocketlaptop.domain.product.mapper;

import com.jsconf.rocketlaptop.domain.product.dto.MainPageProductDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductDetailDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ProductMapper {
    List<MainPageProductDto> selectMainPageProducts();
    List<MainPageProductDto> selectProducts(ProductSearchCondition productSearchCondition);
    Optional<ProductDetailDto> selectProductDetail(Long productSeq);
    boolean existsByProductSeq(Long productSeq);
    Integer countProducts(ProductSearchCondition productSearchCondition);
}
