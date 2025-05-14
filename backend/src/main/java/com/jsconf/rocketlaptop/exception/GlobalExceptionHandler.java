package com.jsconf.rocketlaptop.exception;

import com.jsconf.rocketlaptop.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> apiException(ApiException e) {
        return ResponseUtil.error(e.getErrorCode());
    }
}