package com.jsconf.rocketlaptop.domain.product.service;

import com.jsconf.rocketlaptop.domain.product.dto.CategoryItem;
import com.jsconf.rocketlaptop.domain.product.dto.response.GetCategoriesResponseDto;
import com.jsconf.rocketlaptop.domain.product.mapper.CategoryMapper;
import com.jsconf.rocketlaptop.domain.product.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    public GetCategoriesResponseDto findAllCategories() {
        List<Category> categories = categoryMapper.findAllCategories();
        return GetCategoriesResponseDto.from(
                categories.stream()
                        .map(CategoryItem::from)
                        .toList()
        );
    }
}
