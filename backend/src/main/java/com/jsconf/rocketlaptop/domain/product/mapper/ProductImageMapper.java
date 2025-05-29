package com.jsconf.rocketlaptop.domain.product.mapper;

import com.jsconf.rocketlaptop.domain.product.model.ProductImage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductImageMapper {
    List<ProductImage> findAllByProductSeq(Long productSeq);
    List<ProductImage> findByProductSeq(Long productSeq);
    void saveProductImages(List<ProductImage> productImages);
    void updateProductImage(ProductImage productImage);
    void deleteProductImages(List<Integer> productImageSeqList);
}
