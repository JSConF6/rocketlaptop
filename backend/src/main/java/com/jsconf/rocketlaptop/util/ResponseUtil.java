package com.jsconf.rocketlaptop.util;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.dto.DataResponseDto;
import com.jsconf.rocketlaptop.dto.ErrorResponseDto;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {
    public static <T> ResponseEntity<?> success(SuccessCode successCode, T result) {
        return ResponseEntity.status(successCode.getStatus()).body(DataResponseDto.of(successCode, result));
    }

    public static <T> ResponseEntity<?> success(SuccessCode successCode) {
        return ResponseEntity.status(successCode.getStatus()).body(DataResponseDto.of(successCode));
    }

    public static ResponseEntity<?> error(ErrorCode errorCode) {
        return ResponseEntity.status(errorCode.getStatus()).body(ErrorResponseDto.of(errorCode));
    }
}