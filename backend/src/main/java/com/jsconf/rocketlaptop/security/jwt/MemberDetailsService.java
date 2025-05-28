package com.jsconf.rocketlaptop.security.jwt;

import com.jsconf.rocketlaptop.domain.member.mapper.MemberMapper;
import com.jsconf.rocketlaptop.domain.member.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {
    private final MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberMapper.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException(username)
        );
        return new MemberDetails(member);
    }
}
