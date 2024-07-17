package vn.titv.webbansach_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.titv.webbansach_backend.service.TaiKhoan.TaiKhoanServiceImpl;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private  TaiKhoanServiceImpl taiKhoanService;



//        @CrossOrigin(origins = "http://localhost:3000")
    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<?> dangKyNguoiDung(@RequestBody JsonNode jsonNode){
        return taiKhoanService.dangKyNguoiDung(jsonNode);

    }
    @PostMapping("/active")
    public  ResponseEntity<?> kichHoatTaiKhoan(@RequestBody  JsonNode jsonNode){
        ResponseEntity<?> response = taiKhoanService.kichHoatTaiKhoan(jsonNode);
        return  response;
    }



    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody JsonNode jsonNode) {
        return taiKhoanService.changePassword(jsonNode);
    }


    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePasswordReset(@RequestBody JsonNode jsonNode) {
        String emailFromJson = jsonNode.get("email").asText();
        return taiKhoanService.generateOtpToChange(jsonNode);
    }

}
