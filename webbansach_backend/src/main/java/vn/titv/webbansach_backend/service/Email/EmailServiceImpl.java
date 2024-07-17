package vn.titv.webbansach_backend.service.Email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import vn.titv.webbansach_backend.service.Email.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendMessage(String from, String to, String subject, String text) {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendOtpEmail(String toEmail, String subject, String otpCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("webbansach@email.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText("Your OTP code is: " + otpCode);

        System.out.println("DEBUG: Email content before sending: " + message.toString());

        javaMailSender.send(message);
    }

}
