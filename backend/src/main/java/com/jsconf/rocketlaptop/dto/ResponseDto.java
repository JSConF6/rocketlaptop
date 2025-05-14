package com.jsconf.rocketlaptop.dto;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public abstract class ResponseDto {
    private final String code;
    private final String message;
}
