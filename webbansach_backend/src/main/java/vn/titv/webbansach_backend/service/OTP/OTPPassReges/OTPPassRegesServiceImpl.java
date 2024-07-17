package vn.titv.webbansach_backend.service.OTP.OTPPassReges;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.titv.webbansach_backend.dao.OTPPassRegesRepository;
import vn.titv.webbansach_backend.dao.SecretKeyRepository;
import vn.titv.webbansach_backend.entity.NguoiDung;
import vn.titv.webbansach_backend.entity.OTPPassReges;
import vn.titv.webbansach_backend.entity.SecretKey;

import java.util.Date;
import java.util.List;
@Service
public class OTPPassRegesServiceImpl implements OTPPassRegesService {

    private final GoogleAuthenticator googleAuthenticator;
    private final OTPPassRegesRepository otpPassRegesRepository;
    private final SecretKeyRepository secretKeyRepository;

    @Autowired
    public OTPPassRegesServiceImpl(GoogleAuthenticator googleAuthenticator, OTPPassRegesRepository otpPassRegesRepository, SecretKeyRepository secretKeyRepository) {
        this.googleAuthenticator = googleAuthenticator;
        this.otpPassRegesRepository = otpPassRegesRepository;
        this.secretKeyRepository = secretKeyRepository;
    }



    @Override
    public String generateOTP(NguoiDung nguoiDung, String secretKey) {
        if (nguoiDung != null && secretKey != null) {
            OTPPassReges otpPassReges = new OTPPassReges();
            otpPassReges.setEmail(nguoiDung.getEmail());
            otpPassReges.setCreationTime(new Date(System.currentTimeMillis()));
            otpPassReges.setOtpCode(String.valueOf(googleAuthenticator.getTotpPassword(secretKey)));
            otpPassReges.setUsed(false);
            OTPPassReges otpPassRegesSaved = otpPassRegesRepository.save(otpPassReges);
            return otpPassRegesSaved.getOtpCode();
        } else {
            return null;
        }
    }

    @Override
    public boolean validateOTP(NguoiDung nguoiDung, String otpCodeFromJson) {
        OTPPassReges otpPassReges = otpPassRegesRepository.findOTPPassRegesByOtpCode(otpCodeFromJson);
        if(otpPassReges==null){
            return false;
        }
        System.out.println(otpPassReges.getOtpCode());
        SecretKey secretKey = secretKeyRepository.findSecretKeyByNguoiDung_MaNguoiDung(nguoiDung.getMaNguoiDung());
        if (secretKey == null) {
            return false;
        }
        if(googleAuthenticator.authorize(secretKey.getSecretKey() ,Integer.parseInt(otpPassReges.getOtpCode()))){
            otpPassReges.setUsed(true);
            otpPassRegesRepository.save(otpPassReges);
            return true;
        }else {
            return false;
        }
    }

}
