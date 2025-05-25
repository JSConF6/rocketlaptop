package com.jsconf.rocketlaptop.security.jwt;

import com.jsconf.rocketlaptop.redis.RedisService;
import com.jsconf.rocketlaptop.security.exception.JwtException;
import com.jsconf.rocketlaptop.security.util.SecurityResponseUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private static final List<String> WHITE_LIST = List.of("/auth/", "/oauth2/", "/admin/auth/login", "/admin/auth/logout");
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        if (WHITE_LIST.stream().anyMatch(path::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorizationHeader = jwtTokenProvider.getAuthorizationHeader(request);
        if (authorizationHeader != null && authorizationHeader.startsWith(JwtConstants.TOKEN_PREFIEX)) {
            String accessToken = jwtTokenProvider.getAccessToken(authorizationHeader);
            try {
                if (jwtTokenProvider.validateToken(accessToken)) {
                    MemberDetails memberDetails = jwtTokenProvider.createMemberDetailsFromToken(accessToken);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(memberDetails, null, memberDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (JwtException e) {
                SecurityResponseUtil.fail(response, e.getErrorCode());
            }
        }
        filterChain.doFilter(request, response);
    }
}
