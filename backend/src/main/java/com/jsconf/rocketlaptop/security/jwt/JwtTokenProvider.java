package com.jsconf.rocketlaptop.security.jwt;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.security.exception.JwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProperties jwtProperties;

    @Value("${spring.application.name}")
    private String projectName;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        secretKey = Keys.hmacShaKeyFor(jwtProperties.secret().getBytes(StandardCharsets.UTF_8));
    }

    private String generateToken(Member member, Date expiration, Boolean isRefresh) {
        Long seq = member.getSeq();
        String email = member.getEmail();

        ClaimsBuilder claimsBuilder = Jwts.claims().issuer(projectName).subject(seq.toString());
        if (!isRefresh) {
            claimsBuilder.add("email", email);
            claimsBuilder.add("roles", member.getRole());
        }
        claimsBuilder.issuedAt(new Date()).expiration(expiration);

        return Jwts.builder()
                .claims(claimsBuilder.build())
                .signWith(secretKey)
                .compact();
    }

    private Date generateExpirationDate(Duration expiration) {
        return new Date(System.currentTimeMillis() + expiration.toMillis());
    }

    public String generateAccessToken(Member member) {
        return generateToken(member, generateExpirationDate(jwtProperties.expiration().accessToken()), false);
    }

    public String generateRefreshToken(Member member) {
        return generateToken(member, generateExpirationDate(jwtProperties.expiration().refreshToken()), true);
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT Token : {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.TOKEN_EXPIRED);
        } catch (MalformedJwtException e) {
            log.error("Malformed JWT Token : {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.INVALID_TOKEN);
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.INVALID_SIGNATURE);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token: {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.UNSUPPORTED_TOKEN);
        } catch (IllegalArgumentException e) {
            log.error("Illegal JWT argument : {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.EMPTY_TOKEN);
        } catch (Exception e) {
            log.error("Unexpected error: {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.UNKNOWN_TOKEN);
        }
    }

    public MemberDetails createMemberDetailsFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build().parseSignedClaims(token)
                .getPayload();
        Long memberSeq = Long.parseLong(claims.getSubject());
        String email = claims.get("email", String.class);
        Member member = Member.builder()
                .seq(memberSeq)
                .email(email)
                .role(claims.get("roles", String.class).replace("ROLE_", ""))
                .build();
        return new MemberDetails(member);
    }

    public Duration getAccessTokenExpiration() {
        return jwtProperties.expiration().accessToken();
    }

    public Duration getRefreshTokenExpiration() {
        return jwtProperties.expiration().refreshToken();
    }

    public String getSubject(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build().parseSignedClaims(token)
                .getPayload();
    }

    public String getAuthorizationHeader(HttpServletRequest request) {
        return request.getHeader(JwtConstants.JWT_HEADER);
    }

    public String getAccessToken(String authorization) {
        return authorization.replace(JwtConstants.TOKEN_PREFIEX, "");
    }
}
