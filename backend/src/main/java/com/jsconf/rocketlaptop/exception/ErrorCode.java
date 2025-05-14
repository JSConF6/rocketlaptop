package com.jsconf.rocketlaptop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    BAD_REQUEST("400000", "잘못된 요청입니다.", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED("403000", "접근 권한이 없습니다.", HttpStatus.FORBIDDEN),
    NOT_FOUND("404000", "요청한 리소스를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    METHOD_NOT_ALLOWED("405000", "허용되지 않은 메서드입니다.", HttpStatus.METHOD_NOT_ALLOWED),
    SERVER_ERROR("500000", "서버 내부 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    UNKNOWN_ERROR("520000", "알 수 없는 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),

    UNAUTHORIZED("401100", "로그인이 필요합니다.", HttpStatus.UNAUTHORIZED),
    AUTHENTICATION_FAIL("401101", "사용자 인증 실패 하였습니다.", HttpStatus.UNAUTHORIZED),
    ACCESS_TOKEN_EXPIRED("401102", "ACCESS 토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_EXPIRED("401103", "REFRESH 토큰이 만료되었습니다. 다시 로그인해주세요.", HttpStatus.UNAUTHORIZED),
    MALFORMED_TOKEN("400104", "유효하지 않는 토큰입니다.", HttpStatus.BAD_REQUEST),
    INVALID_SIGNATURE("401105", "서명이 유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED),
    UNSUPPORTED_TOKEN("401106", "지원하지 않는 토큰 형식입니다.", HttpStatus.UNAUTHORIZED),
    EMPTY_TOKEN("400107", "토큰이 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
    UNKNOWN_TOKEN("500108", "토큰 처리 중 알 수 없는 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),


    USER_NOT_FOUND("404200", "회원이 존재하지 않습니다.", HttpStatus.NOT_FOUND),
    LOGIN_FAIL("401201", "아이디 또는 비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED),
    DUPLICATED_EMAIL_ADDRESS("409202", "이메일이 존재합니다.", HttpStatus.CONFLICT),
    DUPLICATED_MOBILE_NUMBER("409203", "휴대폰 번호가 존재합니다.", HttpStatus.CONFLICT),
    VALIDATION_FAIL("400204", "유효성 검사 실패 하였습니다.", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus status;
}
