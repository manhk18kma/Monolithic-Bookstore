package vn.titv.webbansach_backend.service.OTP.OTPPassReges;

import jakarta.transaction.Transactional;
import vn.titv.webbansach_backend.entity.NguoiDung;
import vn.titv.webbansach_backend.entity.OTPLogin;
import vn.titv.webbansach_backend.entity.OTPPassReges;

import java.util.Date;

public interface OTPPassRegesService {
    @Transactional
    public String generateOTP(NguoiDung nguoiDung , String secretKey);

    public boolean validateOTP(NguoiDung nguoiDung, String otpCodeFromJson);


}
