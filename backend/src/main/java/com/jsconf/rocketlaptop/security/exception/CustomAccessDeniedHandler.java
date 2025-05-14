package com.jsconf.rocketlaptop.security.exception;

import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.security.util.SecurityResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) {
        SecurityResponseUtil.fail(response, ErrorCode.ACCESS_DENIED);
    }
}
