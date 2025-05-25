package com.jsconf.rocketlaptop.domain.member.service;

import com.jsconf.rocketlaptop.domain.member.dto.response.GetMeResponseDto;
import com.jsconf.rocketlaptop.domain.member.mapper.MemberMapper;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper memberMapper;

    public GetMeResponseDto getMemberBySeq(Long memberSeq) {
        Member member = memberMapper.findBySeq(memberSeq).orElseThrow(
                () -> new ApiException(ErrorCode.USER_NOT_FOUND)
        );
        return GetMeResponseDto.from(member);
    }
}
