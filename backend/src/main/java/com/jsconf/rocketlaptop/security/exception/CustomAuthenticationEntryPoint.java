package com.jsconf.rocketlaptop.security.exception;

import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.security.util.SecurityResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) {
        if (authException instanceof BadCredentialsException)
            SecurityResponseUtil.fail(response, ErrorCode.LOGIN_FAIL);
        else
            SecurityResponseUtil.fail(response, ErrorCode.AUTHENTICATION_FAIL);
    }
}
