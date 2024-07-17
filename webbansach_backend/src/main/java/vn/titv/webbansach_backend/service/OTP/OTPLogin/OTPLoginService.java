package vn.titv.webbansach_backend.service.OTP.OTPLogin;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import vn.titv.webbansach_backend.entity.OTPLogin;

import java.util.Date;

public interface OTPLoginService {
    @Transactional
    public String generateOTP(String email);

    public boolean validateOTP(OTPLogin otp, String otpCode);

    boolean isOTPStillValid(Date creationTime);
}
