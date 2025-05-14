package com.jsconf.rocketlaptop.domain.product.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Product {
    private Long seq;
    private Long categorySeq;
    private Long memberSeq;
    private String title;
    private String description;
    private Integer price;
    private ProductStatus status;
    private Integer quantity;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
