package vn.titv.webbansach_backend.service.Email;

public interface EmailService {
    public void sendMessage(String from , String to , String subject , String text);
    public void sendOtpEmail(String toEmail, String subject, String otpCode);


}
