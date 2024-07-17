package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.OTPPassReges;

import java.util.List;

@RepositoryRestResource(path = "otp-pass-reges")
public interface OTPPassRegesRepository extends JpaRepository<OTPPassReges , Integer> {

    List<OTPPassReges> findFirstByUsedIsFalseAndEmail(String email);

    OTPPassReges findOTPPassRegesByOtpCode(String otpCode);

}
