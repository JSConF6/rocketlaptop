package com.jsconf.rocketlaptop.domain.product.service;

import com.jsconf.rocketlaptop.domain.product.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;

    public void findProductsBySeller() {

    }
}
