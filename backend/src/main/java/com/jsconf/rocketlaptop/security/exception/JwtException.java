package com.jsconf.rocketlaptop.security.exception;

import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.Getter;

@Getter
public class JwtException extends RuntimeException {
    private final ErrorCode errorCode;

    public JwtException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
