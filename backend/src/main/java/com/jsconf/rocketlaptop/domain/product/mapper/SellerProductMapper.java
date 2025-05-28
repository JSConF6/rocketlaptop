package com.jsconf.rocketlaptop.domain.product.mapper;

import com.jsconf.rocketlaptop.domain.product.dto.ProductDetailDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSummaryDto;
import com.jsconf.rocketlaptop.domain.product.model.Product;
import com.jsconf.rocketlaptop.domain.product.model.ProductDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface SellerProductMapper {
    List<ProductSummaryDto> findBySellerSeq(ProductSearchCondition productSearchCondition);
    Optional<ProductDetailDto> findBySellerSeqAndProductSeq(Product product);
    int countBySellerSeq(ProductSearchCondition productSearchCondition);
    boolean existsBySellerSeqAndProductSeq(Product product);
    void saveSellerProduct(Product product);
    void saveSellerProductDetail(ProductDetail productDetail);
    void updateSellerProduct(Product product);
    void updateSellerProductDetail(ProductDetail productDetail);
    void deleteBySellerSeqAndProductSeq(Product product);
}
