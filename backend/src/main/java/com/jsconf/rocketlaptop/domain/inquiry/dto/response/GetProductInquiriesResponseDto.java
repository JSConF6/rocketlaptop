package com.jsconf.rocketlaptop.domain.inquiry.dto.response;

import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquiryDetailDto;
import lombok.Builder;

import java.util.List;

@Builder
public record GetProductInquiriesResponseDto(
        Integer totalProductInquiryCount,
        List<ProductInquiryDetailDto> productInquiries
) {
    public static GetProductInquiriesResponseDto from(List<ProductInquiryDetailDto> productInquiries, Integer totalProductInquiryCount) {
        return GetProductInquiriesResponseDto.builder()
                .totalProductInquiryCount(totalProductInquiryCount)
                .productInquiries(productInquiries)
                .build();
    }
}
