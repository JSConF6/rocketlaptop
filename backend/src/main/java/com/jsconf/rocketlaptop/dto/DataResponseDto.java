
package com.jsconf.rocketlaptop.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.jsconf.rocketlaptop.common.SuccessCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Getter
@SuperBuilder
public class DataResponseDto<T> extends ResponseDto {
    @JsonInclude(value = NON_NULL)
    private final T result;

    public static <T> DataResponseDto<T> of(SuccessCode code, T result) {
        return DataResponseDto.<T>builder()
                .code(code.getCode())
                .message(code.getMessage())
                .result(result)
                .build();
    }

    public static <T> DataResponseDto<T> of(SuccessCode code) {
        return DataResponseDto.<T>builder()
                .code(code.getCode())
                .message(code.getMessage())
                .build();
    }
}
