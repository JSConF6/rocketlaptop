package com.jsconf.rocketlaptop.security.oauth2.provider;

import com.jsconf.rocketlaptop.domain.member.model.Member;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    Member toModel(String encPassword);
}
