package com.jsconf.rocketlaptop.domain.address.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Address {
    private Long seq;
    private Long memberSeq;
    private String addressName;
    private String recipientName;
    private String phoneNumber;
    private String postalCode;
    private String streetAddress;
    private String detailedAddress;
    private Boolean isDefault;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
