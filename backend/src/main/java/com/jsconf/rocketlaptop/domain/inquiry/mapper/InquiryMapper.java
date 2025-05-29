package com.jsconf.rocketlaptop.domain.inquiry.mapper;

import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquiryDetailDto;
import com.jsconf.rocketlaptop.domain.inquiry.dto.ProductInquirySearchCondition;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InquiryMapper {
    List<ProductInquiryDetailDto> selectProductInquiries(ProductInquirySearchCondition condition);
    Integer countProductInquiries(ProductInquirySearchCondition condition);
}
