package com.jsconf.rocketlaptop.security.jwt;

import com.jsconf.rocketlaptop.domain.member.model.Member;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import com.jsconf.rocketlaptop.security.exception.JwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    private String generateToken(MemberDetails memberDetails, Date expiration, Boolean isRefresh) {
        Long seq = memberDetails.getMember().getSeq();
        String email = memberDetails.getMember().getEmail();

        ClaimsBuilder claimsBuilder = Jwts.claims().issuer(projectName).subject(seq.toString());
        if (!isRefresh) {
            claimsBuilder.add("email", email);
            claimsBuilder.add("roles", memberDetails.getAuthorities()
                    .stream().map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","))
            );
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

    public String generateAccessToken(MemberDetails memberDetails) {
        return generateToken(memberDetails, generateExpirationDate(jwtProperties.expiration().accessToken()), false);
    }

    public String generateRefreshToken(MemberDetails memberDetails) {
        return generateToken(memberDetails, generateExpirationDate(jwtProperties.expiration().refreshToken()), true);
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT Token : {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.ACCESS_TOKEN_EXPIRED);
        } catch (MalformedJwtException e) {
            log.error("Malformed JWT Token : {}", e.getMessage(), e);
            throw new JwtException(ErrorCode.MALFORMED_TOKEN);
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
                .build();
        List<String> memberRoles = Arrays.stream(
                claims.get("roles", String.class).split(",")
        ).toList();
        return new MemberDetails(member, memberRoles);
    }
}
