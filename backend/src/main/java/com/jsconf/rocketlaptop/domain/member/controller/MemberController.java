package com.jsconf.rocketlaptop.domain.member.controller;

import com.jsconf.rocketlaptop.common.SuccessCode;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.domain.member.service.MemberService;
import com.jsconf.rocketlaptop.security.annotation.LoginMember;
import com.jsconf.rocketlaptop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@LoginMember Member member) {
        return ResponseUtil.success(SuccessCode.SUCCESS, memberService.getMemberBySeq(member.getSeq()));
    }
}
