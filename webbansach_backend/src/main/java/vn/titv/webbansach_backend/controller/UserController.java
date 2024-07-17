package vn.titv.webbansach_backend.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.titv.webbansach_backend.entity.ThongBao;
import vn.titv.webbansach_backend.service.Sach.SachServiceImpl;
import vn.titv.webbansach_backend.service.SuDanhGia.SuDanhGiaServiceImpl;
import vn.titv.webbansach_backend.service.TaiKhoan.TaiKhoanServiceImpl;
import vn.titv.webbansach_backend.service.TaiKhoan.UserServiceImpl;
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private  SuDanhGiaServiceImpl suDanhGiaService;
    @Autowired
    private  SachServiceImpl sachService;
    @Autowired
    private  UserServiceImpl userService;
    @Autowired
    private TaiKhoanServiceImpl taiKhoanService;








    @PostMapping("/login")
    public ResponseEntity<?> dangNhapJsonNode(@RequestBody JsonNode jsonNode) throws JsonProcessingException {
        ResponseEntity response = taiKhoanService.dangNhapTaiKhoan(jsonNode);
        return response;
    }



    @PostMapping(path = "/them-danh-gia")
    public ResponseEntity<?> themDanhGia(@RequestBody JsonNode jsonNode){
        try {
            return  suDanhGiaService.saveDanhGia(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("Lỗi Controller ","Thử Lại"));
        }
    }
    @PutMapping(path = "/sua-danh-gia")
    public ResponseEntity<?> suaDanhGia(@RequestBody JsonNode jsonNode){
        System.out.println("in controller");
        try {
            return  suDanhGiaService.suaDanhGia(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("Lỗi Controller ","Thử Lại"));
        }
    }







    @GetMapping("/ten-danh-gia")
    public  ResponseEntity<?> tenDanhGia(@RequestParam int maDanhGia){
        try {
            return ResponseEntity.ok(suDanhGiaService.getUsernameDanhGia(maDanhGia));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ThongBao("Lỗi trong quá trình xử lý", "Lỗi"));
        }
    }








}
