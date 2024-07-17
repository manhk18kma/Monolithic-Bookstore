package KMA.webbansach_backend.service.OTP.SecretKey;

import KMA.webbansach_backend.dao.SecretKeyRepository;
import KMA.webbansach_backend.entity.NguoiDung;
import KMA.webbansach_backend.entity.SecretKey;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class SecretKeyServiceImpl implements SecretKeyService {

    private final SecretKeyRepository secretKeyRepository;
    private final GoogleAuthenticator googleAuthenticator;

    public SecretKeyServiceImpl(SecretKeyRepository secretKeyRepository, GoogleAuthenticator googleAuthenticator) {
        this.secretKeyRepository = secretKeyRepository;
        this.googleAuthenticator = googleAuthenticator;
    }

    @Override
    public String generateSecretKey(NguoiDung nguoiDung) {
        if (nguoiDung == null) {
            return null;
        }
        GoogleAuthenticatorKey key = googleAuthenticator.createCredentials();
        try {
            // Tạo mới secret key và lưu vào cơ sở dữ liệu
            SecretKey secretKey = new SecretKey(key.getKey(), nguoiDung, new Date(System.currentTimeMillis()));
            secretKeyRepository.save(secretKey);
            return key.getKey();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
