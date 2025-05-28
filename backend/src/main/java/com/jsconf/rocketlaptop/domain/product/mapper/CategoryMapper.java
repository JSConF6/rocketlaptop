package com.jsconf.rocketlaptop.domain.product.mapper;

import com.jsconf.rocketlaptop.domain.product.model.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    List<Category> findAllCategories();
}
