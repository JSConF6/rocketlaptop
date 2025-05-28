package com.jsconf.rocketlaptop.domain.product.service;

import com.jsconf.rocketlaptop.common.file.FileService;
import com.jsconf.rocketlaptop.domain.product.dto.ProductDetailDto;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSearchCondition;
import com.jsconf.rocketlaptop.domain.product.dto.ProductSummaryDto;
import com.jsconf.rocketlaptop.domain.product.dto.request.CreateSellerProductRequestDto;
import com.jsconf.rocketlaptop.domain.product.dto.request.UpdateSellerProductRequestDto;
import com.jsconf.rocketlaptop.domain.product.dto.response.*;
import com.jsconf.rocketlaptop.domain.product.mapper.ProductImageMapper;
import com.jsconf.rocketlaptop.domain.product.mapper.ProductMapper;
import com.jsconf.rocketlaptop.domain.product.mapper.SellerProductMapper;
import com.jsconf.rocketlaptop.domain.product.model.Product;
import com.jsconf.rocketlaptop.domain.product.model.ProductDetail;
import com.jsconf.rocketlaptop.domain.product.model.ProductImage;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerProductService {
    private final FileService fileService;
    private final ProductImageMapper productImageMapper;
    private final SellerProductMapper sellerProductMapper;
    private final ProductMapper productMapper;

    public GetSellerProductsResponseDto findProductsBySeller(ProductSearchCondition condition) {
        List<ProductSummaryDto> sellerProducts = sellerProductMapper.findBySellerSeq(condition);
        int totalCount = sellerProductMapper.countBySellerSeq(condition);
        return GetSellerProductsResponseDto.from(sellerProducts, totalCount);
    }

    public GetSellerProductResponseDto findProductBySeller(Long sellerSeq, Long productSeq) {
        Product product = Product.builder()
                .seq(productSeq)
                .sellerSeq(sellerSeq)
                .build();
        ProductDetailDto productDetailDto = sellerProductMapper.findBySellerSeqAndProductSeq(product).orElseThrow(
                () -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND)
        );
        List<ProductImage> productImages = productImageMapper.findAllByProductSeq(productDetailDto.seq());
        List<ProductImageResponseDto> productImagesResponse = productImages.stream().map(ProductImageResponseDto::from).toList();
        return GetSellerProductResponseDto.from(productDetailDto, productImagesResponse);
    }

    @Transactional
    public CreateSellerProductResponseDto registerSellerProduct(Long sellerSeq, CreateSellerProductRequestDto productDto, List<MultipartFile> images) {
        List<String> uploadUrls = new ArrayList<>();
        try {
            Product product = productDto.toProduct(sellerSeq);
            sellerProductMapper.saveSellerProduct(product);

            ProductDetail productDetail = productDto.toProductDetail(product.getSeq());
            sellerProductMapper.saveSellerProductDetail(productDetail);

            for (MultipartFile image : images) {
                String uploadUrl = fileService.upload(image);
                uploadUrls.add(uploadUrl);
            }
            List<ProductImage> productImages = new ArrayList<>();
            for (int i = 0; i < uploadUrls.size(); i++) {
                ProductImage productImage = ProductImage.builder()
                        .productSeq(product.getSeq())
                        .productImagePath(uploadUrls.get(i))
                        .productImageOrder(i + 1)
                        .build();
                productImages.add(productImage);
            }
            productImageMapper.saveProductImages(productImages);
            return CreateSellerProductResponseDto.from(product);
        } catch (Exception e) {
            uploadUrls.forEach(fileService::delete);
            throw new ApiException(ErrorCode.PRODUCT_SAVE_FAIL);
        }
    }

    @Transactional
    public UpdateSellerProductResponseDto updateSellerProduct(Long productSeq, Long sellerSeq, UpdateSellerProductRequestDto updateProductDto, List<MultipartFile> newImages) {
        Product product = Product.builder()
                .seq(productSeq)
                .sellerSeq(sellerSeq)
                .build();
        if (!sellerProductMapper.existsBySellerSeqAndProductSeq(product))
            throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND);

        List<String> uploadUrls = new ArrayList<>();
        try {
            if (!updateProductDto.deletedImageSeqs().isEmpty())
                productImageMapper.deleteProductImages(updateProductDto.deletedImageSeqs());

            if (newImages != null && !newImages.isEmpty()) {
                for (UpdateSellerProductRequestDto.ProductImageOrderDto productImageOrder : updateProductDto.updateProductImages())
                    productImageMapper.updateProductImage(productImageOrder.toProductImage());

                for (MultipartFile newImage : newImages) {
                    String uploadUrl = fileService.upload(newImage);
                    uploadUrls.add(uploadUrl);
                }
                int productImageOrder = updateProductDto.updateProductImages().size();
                List<ProductImage> productImages = new ArrayList<>();
                for (int i = 0; i < uploadUrls.size(); i++) {
                    ProductImage productImage = ProductImage.builder()
                            .productSeq(productSeq)
                            .productImagePath(uploadUrls.get(i))
                            .productImageOrder(productImageOrder + 1 + i)
                            .build();
                    productImages.add(productImage);
                }
                productImageMapper.saveProductImages(productImages);
            }

            Product updateProduct = updateProductDto.product().toProduct(productSeq, sellerSeq);
            sellerProductMapper.updateSellerProduct(updateProduct);

            ProductDetail updateProductDetail = updateProductDto.product().toProductDetail(productSeq);
            sellerProductMapper.updateSellerProductDetail(updateProductDetail);
        } catch (Exception e) {
            uploadUrls.forEach(fileService::delete);
            throw new ApiException(ErrorCode.PRODUCT_UPDATE_FAIL);
        }
        return UpdateSellerProductResponseDto.from(product);
    }

    @Transactional
    public void deleteSellerProduct(Long sellerSeq, Long productSeq) {
        Product product = Product.builder()
                .seq(productSeq)
                .sellerSeq(sellerSeq)
                .build();
        boolean existsProduct = sellerProductMapper.existsBySellerSeqAndProductSeq(product);
        if (!existsProduct)
            throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND);
        sellerProductMapper.deleteBySellerSeqAndProductSeq(product);
    }
}
