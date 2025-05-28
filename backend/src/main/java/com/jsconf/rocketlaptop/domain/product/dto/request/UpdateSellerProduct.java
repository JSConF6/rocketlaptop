package com.jsconf.rocketlaptop.domain.product.dto.request;

import com.jsconf.rocketlaptop.domain.product.model.Product;
import com.jsconf.rocketlaptop.domain.product.model.ProductDetail;
import com.jsconf.rocketlaptop.domain.product.model.ProductStatus;
import lombok.Builder;

@Builder
public record UpdateSellerProduct(
        String name,
        Long categorySeq,
        Integer price,
        Integer quantity,
        String status,
        String processor,
        String memory,
        String storage,
        String graphics,
        String display,
        String battery,
        String weight,
        String os
) {
    public Product toProduct(Long productSeq, Long sellerSeq) {
        return Product.builder()
                .seq(productSeq)
                .categorySeq(categorySeq)
                .sellerSeq(sellerSeq)
                .productName(name)
                .price(price)
                .quantity(quantity)
                .status(ProductStatus.valueOf(status))
                .build();
    }

    public ProductDetail toProductDetail(Long productSeq) {
        return ProductDetail.builder()
                .productSeq(productSeq)
                .processor(processor)
                .memory(memory)
                .storage(storage)
                .graphics(graphics)
                .display(display)
                .battery(battery)
                .weight(weight)
                .os(os)
                .build();
    }
}
