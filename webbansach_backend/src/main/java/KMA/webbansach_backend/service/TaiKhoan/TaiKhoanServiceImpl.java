package KMA.webbansach_backend.service.TaiKhoan;

import KMA.webbansach_backend.dao.NguoiDungRepository;
import KMA.webbansach_backend.dao.QuyenRepository;
import KMA.webbansach_backend.dao.SecretKeyRepository;
import KMA.webbansach_backend.entity.NguoiDung;
import KMA.webbansach_backend.entity.Quyen;
import KMA.webbansach_backend.entity.SecretKey;
import KMA.webbansach_backend.entity.ThongBao;
import KMA.webbansach_backend.service.Email.EmailService;
import KMA.webbansach_backend.service.OTP.OTPPassReges.OTPPassRegesServiceImpl;
import KMA.webbansach_backend.service.OTP.SecretKey.SecretKeyServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import KMA.webbansach_backend.Endpoints.JwtResponse;
import KMA.webbansach_backend.Endpoints.LoginRequest;


import java.sql.Date;
import java.util.*;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;
    @Autowired
    private QuyenRepository quyenRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private SecretKeyServiceImpl secretKeyService;
    @Autowired
    private OTPPassRegesServiceImpl otpPassRegesService;
    @Autowired
    private SecretKeyRepository secretKeyRepository;






    @Override
    public ResponseEntity<?> dangKyNguoiDung(JsonNode jsonNode) {
        if (jsonNode == null || jsonNode.isNull()) {
            return ResponseEntity.badRequest().body(new ThongBao("Dữ liệu không hợp lệ", "Vui lòng kiểm tra lại."));
        }

        String username = jsonNode.get("username").asText();
        String password = jsonNode.get("password").asText();
        String email = jsonNode.get("email").asText();
        String name = jsonNode.get("name").asText();
        String phone = jsonNode.get("phone").asText();

        String dateOfBirthString = jsonNode.get("dateOfBirth").asText();

        if (username.isEmpty() || password.isEmpty() || email.isEmpty() || name.isEmpty() || dateOfBirthString.isEmpty()) {
            return ResponseEntity.badRequest().body(new ThongBao("Dữ liệu không hợp lệ", "Vui lòng điền đầy đủ thông tin."));
        }

        Date dateOfBirth;
        try {
            dateOfBirth = Date.valueOf(dateOfBirthString);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ThongBao("Ngày sinh không hợp lệ", "Vui lòng kiểm tra lại định dạng ngày sinh."));
        }

        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setTenDangNhap(username);
        nguoiDung.setEmail(email);
        nguoiDung.setTen(name);
        nguoiDung.setNgaySinh(dateOfBirth);
        nguoiDung.setMatKhau(password);
        nguoiDung.setSoDienThoai(phone);

        if (nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())) {
            return ResponseEntity.badRequest().body(new ThongBao("Tên Đăng Nhập Đã Tồn Tại", "Chọn Tên Khác"));
        }

        if (nguoiDungRepository.existsByEmail(nguoiDung.getEmail())) {
            return ResponseEntity.badRequest().body(new ThongBao("Email Đã Tồn Tại", "Email Khác"));
        }

        nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDung.getMatKhau()));
        nguoiDung.setDaKichHoat(false);

//        Optional<Quyen> admin = quyenRepository.findById(1);
        Optional<Quyen> user = quyenRepository.findById(2);


        List<Quyen> danhSachQuyen = new ArrayList<>();
            danhSachQuyen.add(user.get());
            nguoiDung.setDanhSachQuyen(danhSachQuyen);


        String secretKey = secretKeyService.generateSecretKey(nguoiDung);
        NguoiDung nguoiDungSaved =  nguoiDungRepository.save(nguoiDung);
        String otpCode = otpPassRegesService.generateOTP(nguoiDungSaved, secretKey);
        guiEmailKichHoat(nguoiDung.getEmail(), otpCode);

        return ResponseEntity.ok(new ThongBao("Đăng Ký Thành Công", "Bạn Có Thể Đăng Nhập, Vui Lòng Kích Hoạt Tài Khoản Bằng Email"));
    }


//    private String taoMaKichHoat(){
//        //tao ma ngau nhien
//        return UUID.randomUUID().toString();
//    }

    private void guiEmailKichHoat(String email, String maKichHoat) {
        String subject = "Kích Hoạt Tài Khoản WebBanSach";
        String text = "Vui lòng nhập mã kích hoạt sau để kích hoạt tài khoản có email: " + email + " :<br/><h1>" + maKichHoat + "</h1>";
        text += "<br/> Click vào đường dẫn sau để kích hoạt : ";
        String url = "http://localhost:3000/kich-hoat/" + email + "/" + maKichHoat;
        text += "<br/> <a href=\"" + url + "\">" + url + "</a>";
        emailService.sendMessage("webbansach@email.com", email, subject, text);
    }



    @Override
    public ResponseEntity<?> kichHoatTaiKhoan (JsonNode jsonNode){
        String emailFromJson = jsonNode.get("email").asText();
        String otpCodeFromJson = jsonNode.get("otpCode").asText();
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(emailFromJson);
        if(nguoiDung == null){
            return ResponseEntity.badRequest().body(new ThongBao("người dùng không tồn tại " , "thử lại email khác"));
        }
        if(nguoiDung.isDaKichHoat()){
            return ResponseEntity.badRequest().body(new ThongBao("tài khoản đã dược kích hoạt " , "hãy đăng nhập"));
        }

        if(otpPassRegesService.validateOTP(nguoiDung , otpCodeFromJson)){
            nguoiDung.setDaKichHoat(true);
            nguoiDungRepository.save(nguoiDung);
            return  ResponseEntity.ok(new ThongBao("Kích Hoạt Thành Công" , "Hãy Đăng Nhập"));
        }else {
            return ResponseEntity.badRequest().body(new ThongBao("Mã Kích Hoạt Không Chính Xác " , "Nhập Lại"));
        }
    }



    @Override
    public ResponseEntity<?> dangNhapTaiKhoan(JsonNode jsonNode) throws JsonProcessingException {
        LoginRequest loginRequest = objectMapper.treeToValue(jsonNode , LoginRequest.class);
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(loginRequest.getUsername());
       if(nguoiDung!=null){
           if(nguoiDung.isDaKichHoat()){
               try {
                   System.out.println(loginRequest.toString());
                   Authentication authentication = authenticationManager.authenticate(
                           new UsernamePasswordAuthenticationToken(loginRequest.getUsername() , loginRequest.getPassword()));
                   if (authentication.isAuthenticated()) {
                       final String jwt = jwtService.generateToken(loginRequest.getUsername());
                       return ResponseEntity.ok(new JwtResponse(jwt));
                   } else {
                       return ResponseEntity.badRequest().body(new ThongBao("Xác thực không thành công", "Đăng nhập lại"));
                   }
               } catch (BadCredentialsException exception) {
                   return ResponseEntity.badRequest().body(new ThongBao("Tên đăng nhập hoặc mật khẩu không chính xác", "Đăng nhập lại"));
               } catch (LockedException | DisabledException exception) {
                   return ResponseEntity.badRequest().body(new ThongBao("Tài khoản đã bị khóa hoặc bị vô hiệu hóa", "Liên hệ quản trị viên"));
               } catch (AuthenticationException exception) {
                   return ResponseEntity.badRequest().body(new ThongBao("Xác Thực Không Thành Công", "Đăng Nhập Lại"));
               }
           }else {
               return ResponseEntity.badRequest().body(new ThongBao("Xác Thực Tài Khoản ", "Đăng Nhập Lại"));
           }
       }else {
           return ResponseEntity.badRequest().body(new ThongBao("Người dùng không tồn tại ", "Đăng Nhập Lại"));
       }
    }


    @Transactional
    @Override
    public ResponseEntity<?> changePassword(JsonNode jsonNode) {
        String emailFromJson = jsonNode.get("email").asText();
        String otpCode = jsonNode.get("otpCode").asText();
        String oldPassword = jsonNode.get("oldPassword").asText();
        String newPasswrod = jsonNode.get("newPassword").asText();
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(emailFromJson);
        System.out.println(otpCode);
        if(nguoiDung == null){
            return ResponseEntity.badRequest().body(new ThongBao("người dùng không tồn tại " , "thử lại email khác"));
        }

        if(otpPassRegesService.validateOTP(nguoiDung , otpCode)&&passwordEncoder.matches(oldPassword , nguoiDung.getMatKhau())){
            nguoiDung.setMatKhau(passwordEncoder.encode(newPasswrod));
            nguoiDungRepository.save(nguoiDung);
            return  ResponseEntity.ok(new ThongBao("Thay Đổi Mật Khẩu Thành Công Thành Công" , "Hãy Đăng Nhập"));
        }else {
            return ResponseEntity.badRequest().body(new ThongBao("OTP Không Chính Xác " , "Nhập Lại"));
        }


    }

    @Override
    public ResponseEntity<?> generateOtpToChange(JsonNode jsonNode) {
        String emailFromJson = jsonNode.get("email").asText();
        NguoiDung nguoiDung =  nguoiDungRepository.findByEmail(emailFromJson);
        SecretKey secretKey = secretKeyRepository.findSecretKeyByNguoiDung_MaNguoiDung(nguoiDung.getMaNguoiDung());
        if(nguoiDung!=null) {
             String otpCode = otpPassRegesService.generateOTP(nguoiDung , secretKey.getSecretKey());
             guiEmailKichHoat(nguoiDung.getEmail(),otpCode);
             return ResponseEntity.ok().body(otpCode);
        }else {
            return ResponseEntity.badRequest().body("Ngừoi dùng không tồn tại");
        }
    }

}
