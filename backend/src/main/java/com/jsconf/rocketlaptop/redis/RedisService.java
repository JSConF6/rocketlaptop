package com.jsconf.rocketlaptop.redis;

import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;

    public void setValues(String key, String value, Duration expiration) {
        redisTemplate.opsForValue().set(key, value, expiration);
    }

    public String getValues(String key) {
        Object value = redisTemplate.opsForValue().get(key);
        return value != null ? value.toString() : null;
    }

    public void deleteValues(String key) {
        try {
            redisTemplate.delete(key);
        } catch (Exception e) {
            throw new ApiException(ErrorCode.SERVER_ERROR);
        }
    }
}
