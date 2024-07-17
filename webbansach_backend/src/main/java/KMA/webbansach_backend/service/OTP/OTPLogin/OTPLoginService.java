package KMA.webbansach_backend.service.OTP.OTPLogin;

import KMA.webbansach_backend.entity.OTPLogin;
import jakarta.transaction.Transactional;

import java.util.Date;

public interface OTPLoginService {
    @Transactional
    public String generateOTP(String email);

    public boolean validateOTP(OTPLogin otp, String otpCode);

    boolean isOTPStillValid(Date creationTime);
}
