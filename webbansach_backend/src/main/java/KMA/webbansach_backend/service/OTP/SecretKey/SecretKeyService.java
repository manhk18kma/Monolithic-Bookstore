package KMA.webbansach_backend.service.OTP.SecretKey;

import KMA.webbansach_backend.entity.NguoiDung;
import jakarta.transaction.Transactional;

public interface SecretKeyService {
    @Transactional
    String generateSecretKey(NguoiDung nguoiDung);
}
