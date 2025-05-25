package com.jsconf.rocketlaptop.security.config;

import com.jsconf.rocketlaptop.domain.member.model.UserRole;
import com.jsconf.rocketlaptop.redis.RedisService;
import com.jsconf.rocketlaptop.security.exception.CustomAccessDeniedHandler;
import com.jsconf.rocketlaptop.security.exception.CustomAuthenticationEntryPoint;
import com.jsconf.rocketlaptop.security.jwt.JwtAuthorizationFilter;
import com.jsconf.rocketlaptop.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CorsConfig corsConfig;
    private final RedisService redisService;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))

                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/oauth2/**").permitAll()
                        .requestMatchers("/admin/auth/login", "/admin/auth/logout").permitAll()
                        .requestMatchers("/admin/**").hasRole(UserRole.ADMIN.name())
                        .requestMatchers("/api/member/**").hasRole(UserRole.USER.name())
                )

                .addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider, redisService), BasicAuthenticationFilter.class)

                .exceptionHandling(ec -> ec.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .exceptionHandling(ec -> ec.accessDeniedHandler(new CustomAccessDeniedHandler()))

                .build();
    }
}
