package vn.titv.webbansach_backend.service.UploadImageService;

import org.springframework.web.multipart.MultipartFile;

public interface UploadImageService {
    String uploadImage(MultipartFile multipartFile , String name);

    void deleteImage(String imgUrl);
}
