package KMA.webbansach_backend.service.OTP.OTPLogin;

import KMA.webbansach_backend.entity.OTPLogin;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import KMA.webbansach_backend.service.Email.EmailServiceImpl;

import java.util.Date;

@Service
public class OTPLoginserviceImpl implements OTPLoginService {

    private final EmailServiceImpl emailService;
    private GoogleAuthenticatorConfig googleAuthenticatorConfig;

    @Autowired
    public OTPLoginserviceImpl(GoogleAuthenticatorConfig googleAuthenticatorConfig, EmailServiceImpl emailService) {
        this.googleAuthenticatorConfig = googleAuthenticatorConfig;
        this.emailService = emailService;
    }

    @Override
    public String generateOTP(String email) {
        GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator(googleAuthenticatorConfig);
        GoogleAuthenticatorKey key = googleAuthenticator.createCredentials();
        return String.valueOf(googleAuthenticator.getTotpPassword(key.getKey()));
    }

    @Override
    public boolean validateOTP(OTPLogin otp, String otpCode) {
        // Phương thức này cần được triển khai cho việc kiểm tra mã OTP
        return false;
    }

    @Override
    public boolean isOTPStillValid(Date creationTime) {
        // Phương thức này cần được triển khai cho việc kiểm tra tính hợp lệ của mã OTP
        return false;
    }
}
