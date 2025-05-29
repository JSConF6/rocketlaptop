package com.jsconf.rocketlaptop.domain.inquiry.service;

import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquiryDetailDto;
import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquirySearchCondition;
import com.jsconf.rocketlaptop.domain.inquiry.dto.response.GetProductInquiriesResponseDto;
import com.jsconf.rocketlaptop.domain.inquiry.mapper.InquiryMapper;
import com.jsconf.rocketlaptop.domain.product.mapper.ProductMapper;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final InquiryMapper inquiryMapper;
    private final ProductMapper productMapper;

    public GetProductInquiriesResponseDto getProductInquiries(ProductInquirySearchCondition condition) {
        if (!productMapper.existsByProductSeq(condition.productSeq()))
            throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND);
        List<ProductInquiryDetailDto> productInquiries = inquiryMapper.selectProductInquiries(condition);
        Integer totalProductInquiryCount = inquiryMapper.countProductInquiries(condition);
        return GetProductInquiriesResponseDto.from(productInquiries, totalProductInquiryCount);
    }
}
