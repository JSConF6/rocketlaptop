package com.jsconf.rocketlaptop.domain.member.mapper;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {
    Optional<Member> findBySeq(Long seq);
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    void save(Member member);
}
