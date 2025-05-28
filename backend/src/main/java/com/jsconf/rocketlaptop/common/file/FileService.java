package com.jsconf.rocketlaptop.common.file;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String upload(MultipartFile file);
    void delete(String path);
}
