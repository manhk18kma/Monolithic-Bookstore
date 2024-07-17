package vn.titv.webbansach_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "otp_login")
public class OTPLogin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String otpCode;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date creationTime;

    private boolean used;

    public OTPLogin() {
    }

    public OTPLogin(String email, String otpCode, Date creationTime, boolean used) {
        this.email = email;
        this.otpCode = otpCode;
        this.creationTime = creationTime;
        this.used = used;
    }

    // Getters, setters, and other methods
}
