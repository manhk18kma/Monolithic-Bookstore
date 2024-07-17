package vn.titv.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import vn.titv.webbansach_backend.entity.OTPLogin;

import java.util.ArrayList;

@RepositoryRestResource(path = "otp")
public interface OTPLoginRepository extends JpaRepository<OTPLogin, Integer> {
    ArrayList<OTPLogin> findOTPByEmail(String email);

    OTPLogin findByUsedIsTrueAndEmail(String email);
    OTPLogin findByUsedIsFalseAndEmail(String email);

    void deleteOTPByUsedIsFalseAndEmail(String email);



}
