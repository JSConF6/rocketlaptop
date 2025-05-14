package com.jsconf.rocketlaptop.security.jwt;

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

@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String Authorization = request.getHeader(JwtConstants.JWT_HEADER);
        if (Authorization != null && Authorization.startsWith(JwtConstants.TOKEN_PREFIEX)) {
            String accessToken = Authorization.replace(JwtConstants.TOKEN_PREFIEX, "");
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
