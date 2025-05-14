package com.jsconf.rocketlaptop.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {
    SUCCESS("200000", "요청 성공 하였습니다.", HttpStatus.OK),
    LOGIN_SUCCESS("200000", "로그인 성공 하였습니다.", HttpStatus.OK),
    LOGOUT_SUCCESS("200000", "로그아웃 성공 하였습니다.", HttpStatus.OK),
    TOKEN_REFRESH_SUCCESS("200000", "토큰 재발급 성공하였습니다.", HttpStatus.OK),

    CREATED("201000", "생성 성공 하였습니다.", HttpStatus.CREATED),
    USER_CREATED("201000", "회원가입 성공 하였습니다.", HttpStatus.CREATED);

    private final String code;
    private final String message;
    private final HttpStatus status;
}