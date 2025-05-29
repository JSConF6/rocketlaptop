package com.jsconf.rocketlaptop.domain.product.service;

import com.jsconf.rocketlaptop.domain.product.dto.MainPageProductDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductDetailDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import com.jsconf.rocketlaptop.domain.product.dto.response.GetMainPageProductsResponseDto;
import com.jsconf.rocketlaptop.domain.product.dto.response.GetProductResponseDto;
import com.jsconf.rocketlaptop.domain.product.dto.response.GetProductsResponseDto;
import com.jsconf.rocketlaptop.domain.product.dto.response.ProductImageResponseDto;
import com.jsconf.rocketlaptop.domain.product.mapper.ProductImageMapper;
import com.jsconf.rocketlaptop.domain.product.mapper.ProductMapper;
import com.jsconf.rocketlaptop.domain.product.model.ProductImage;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;
    private final ProductImageMapper productImageMapper;

    public GetMainPageProductsResponseDto getMainPageProducts() {
        return GetMainPageProductsResponseDto.from(productMapper.selectMainPageProducts());
    }

    public GetProductsResponseDto getProducts(ProductSearchCondition condition) {
        List<MainPageProductDto> products = productMapper.selectProducts(condition);
        int totalCount = productMapper.countProducts(condition);
        return GetProductsResponseDto.from(products, totalCount);
    }

    public GetProductResponseDto getProduct(Long productSeq) {
        ProductDetailDto productDetail = productMapper.selectProductDetail(productSeq).orElseThrow(
                () -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND)
        );
        List<ProductImage> productImages = productImageMapper.findByProductSeq(productSeq);
        List<ProductImageResponseDto> productImagesResponse = productImages.stream().map(ProductImageResponseDto::from).toList();
        return GetProductResponseDto.from(productDetail, productImagesResponse);
    }
}
