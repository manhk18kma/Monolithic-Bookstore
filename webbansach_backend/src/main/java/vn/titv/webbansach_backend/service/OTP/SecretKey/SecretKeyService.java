package vn.titv.webbansach_backend.service.OTP.SecretKey;

import jakarta.transaction.Transactional;
import vn.titv.webbansach_backend.entity.NguoiDung;

public interface SecretKeyService {
    @Transactional
    String generateSecretKey(NguoiDung nguoiDung);
}
