package KMA.webbansach_backend.service.OTP.OTPPassReges;

import KMA.webbansach_backend.entity.NguoiDung;
import jakarta.transaction.Transactional;

public interface OTPPassRegesService {
    @Transactional
    public String generateOTP(NguoiDung nguoiDung , String secretKey);

    public boolean validateOTP(NguoiDung nguoiDung, String otpCodeFromJson);


}
