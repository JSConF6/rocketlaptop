package com.jsconf.rocketlaptop.security.jwt;

import com.jsconf.rocketlaptop.domain.member.mapper.MemberMapper;
import com.jsconf.rocketlaptop.domain.member.mapper.MemberRoleMapper;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberMapper memberMapper;
    private final MemberRoleMapper memberRoleMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberMapper.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("아이디 또는 비밀번호가 일치하지 않습니다.")
        );
        List<String> memberRoles = memberRoleMapper.findByMemberSeq(member.getSeq());
        return new MemberDetails(member, memberRoles);
    }
}
