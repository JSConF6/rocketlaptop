package com.jsconf.rocketlaptop.domain.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRoleMapper {
    List<String> findByMemberSeq(Long memberSeq);
}
