package com.jsconf.rocketlaptop.common.file;

import com.jsconf.rocketlaptop.exception.ApiException;
import com.jsconf.rocketlaptop.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Slf4j
@Service
@Profile("local")
@RequiredArgsConstructor
public class LocalFileService implements FileService {
    @Value("${file.upload-path}")
    private String uploadPath;

    @Override
    public String upload(MultipartFile file) {
        try {
            String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + ext;
            Path savePath = Paths.get(uploadPath).resolve(fileName);
            Files.createDirectories(savePath.getParent());
            Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);
            return  "/uploads/" + fileName;
        } catch (Exception e) {
            throw new ApiException(ErrorCode.IMAGE_SAVE_FAIL);
        }
    }

    @Override
    public void delete(String path) {
        try {
            String fileName = path.replace("/uploads/", "");
            Path filePath = Paths.get(uploadPath).resolve(fileName);
            Files.deleteIfExists(filePath);
        } catch (Exception e) {
            log.error("이미지 파일 삭제 실패 :: {}", e.getMessage());
        }
    }
}
