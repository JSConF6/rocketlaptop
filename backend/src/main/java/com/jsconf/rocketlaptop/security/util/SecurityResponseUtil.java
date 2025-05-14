package com.jsconf.rocketlaptop.security.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsconf.rocketlaptop.constants.AppConstants;
import com.jsconf.rocketlaptop.dto.ErrorResponseDto;
import com.jsconf.rocketlaptop.dto.ResponseDto;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Slf4j
public class SecurityResponseUtil {
    private static void send(HttpServletResponse response, ResponseDto responseDto, HttpStatus status) {
        try {
            ObjectMapper om = new ObjectMapper();
            String responseBody = om.writeValueAsString(responseDto);
            response.setContentType(AppConstants.CONTENT_TYPE_JSON);
            response.setStatus(status.value());
            response.getWriter().println(responseBody);
        } catch (Exception e) {
            log.error("응답 전송 중 예외 발생 : {}", e.getMessage(), e);
        }
    }

    public static void fail(HttpServletResponse response, ErrorCode errorCode) {
        ErrorResponseDto errorResponseDto = ErrorResponseDto.of(errorCode);
        send(response, errorResponseDto, errorCode.getStatus());
    }
}
