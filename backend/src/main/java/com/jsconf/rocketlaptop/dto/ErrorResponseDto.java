package com.jsconf.rocketlaptop.dto;

import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class ErrorResponseDto extends ResponseDto {
    public static ErrorResponseDto of(ErrorCode errorCode) {
        return ErrorResponseDto.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }
}