package com.jsconf.rocketlaptop.config.resolver;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.security.annotation.LoginMember;
import com.jsconf.rocketlaptop.security.jwt.MemberDetails;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(Member.class) &&
                parameter.hasParameterAnnotation(LoginMember.class);
    }

    @Override
    public Member resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof MemberDetails) {
            return ((MemberDetails) authentication.getPrincipal()).getMember();
        }
        System.out.println("asdasdaasd");

        throw new ApiException(ErrorCode.UNAUTHORIZED);
    }
}
