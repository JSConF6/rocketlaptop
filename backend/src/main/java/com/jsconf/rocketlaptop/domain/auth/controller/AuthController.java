package com.jsconf.rocketlaptop.domain.auth.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.auth.dto.request.LoginRequestDto;
import com.jsconf.rocketlaptop.domain.auth.dto.request.ReissueTokenRequestDto;
import com.jsconf.rocketlaptop.domain.auth.dto.request.SignUpRequestDto;
import com.jsconf.rocketlaptop.domain.auth.dto.request.SocialLoginRequestDto;
import com.jsconf.rocketlaptop.domain.auth.service.AuthService;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto signUpRequestDtos) {
        authService.signUp(signUpRequestDtos);
        return ResponseUtil.success(SuccessCode.USER_CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        return ResponseUtil.success(SuccessCode.SUCCESS, authService.login(loginRequestDto));
    }

    @PostMapping("/social/{provider}")
    public ResponseEntity<?> socialLogin(
            @PathVariable String provider, HttpServletResponse response,
            @RequestBody SocialLoginRequestDto socialLoginRequestDto
    ) {
        return ResponseUtil.success(SuccessCode.LOGIN_SUCCESS, authService.processSocialLogin(response, provider, socialLoginRequestDto));
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<?> reissueToken(
            HttpServletResponse response,
            @RequestBody ReissueTokenRequestDto reissueTokenRequestDto
    ) {
        return ResponseUtil.success(SuccessCode.TOKEN_REFRESH_SUCCESS, authService.reissueToken(reissueTokenRequestDto, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request
    ) {
        authService.logout(request);
        return ResponseUtil.success(SuccessCode.LOGOUT_SUCCESS);
    }
}
