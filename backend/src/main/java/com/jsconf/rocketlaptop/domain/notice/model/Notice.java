package com.jsconf.rocketlaptop.domain.notice.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class Notice {
    private Long seq;
    private Long memberSeq;
    private String title;
    private String content;
    private Boolean isActive;
    private Boolean isImportant;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
