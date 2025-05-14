package com.jsconf.rocketlaptop.security.config;

import com.jsconf.rocketlaptop.security.exception.CustomAccessDeniedHandler;
import com.jsconf.rocketlaptop.security.exception.CustomAuthenticationEntryPoint;
import com.jsconf.rocketlaptop.security.jwt.JwtAuthorizationFilter;
import com.jsconf.rocketlaptop.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CorsConfig corsConfig;
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))

                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login").permitAll()
                )

                .addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider), BasicAuthenticationFilter.class)

                .exceptionHandling(ec -> ec.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .exceptionHandling(ec -> ec.accessDeniedHandler(new CustomAccessDeniedHandler()))

                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
