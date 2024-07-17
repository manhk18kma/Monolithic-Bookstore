package vn.titv.webbansach_backend.config;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OTPConfig {
    @Bean
    public GoogleAuthenticator googleAuthenticator(GoogleAuthenticatorConfig googleAuthenticatorConfig) {
        return new GoogleAuthenticator(googleAuthenticatorConfig);
    }

    @Bean
    public GoogleAuthenticatorConfig googleAuthenticatorConfig() {
        return new GoogleAuthenticatorConfig.GoogleAuthenticatorConfigBuilder()
                // Sử dụng Time-based OTP
                .setTimeStepSizeInMillis(300000) // Thời gian giữa hai lần tạo mã OTP (30 giây)
                .setWindowSize(1) // Sử dụng cửa sổ 1 (chỉ một mã OTP có hiệu lực trong một thời điểm)
                .build();
    }


}


