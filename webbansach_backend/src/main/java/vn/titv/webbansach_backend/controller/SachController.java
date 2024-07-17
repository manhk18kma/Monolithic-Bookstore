package vn.titv.webbansach_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.titv.webbansach_backend.entity.Sach;
import vn.titv.webbansach_backend.entity.ThongBao;
import vn.titv.webbansach_backend.service.Sach.SachServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/book")
public class SachController {

    private SachServiceImpl sachService;


    @Autowired
    public SachController(SachServiceImpl sachService) {
        this.sachService = sachService;
    }


    @PostMapping(path = "/create-book")
    public ResponseEntity<?> themSach(@RequestBody JsonNode jsonNode){
        try {
            return  sachService.themSach(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("loi roi ","thu lai"));
        }
    }

    @PutMapping(path = "/update-book")
    public ResponseEntity<?> suaSach(@RequestBody JsonNode jsonNode){
        try {
            return  sachService.suaSach(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("loi roi ","thu lai"));
        }
    }

    @PutMapping(path = "/create-favourite-book")
    public ResponseEntity<?> themSachYeuThich(@RequestBody JsonNode jsonNode){
        try {
            return  sachService.themSachYeuThich(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("loi roi ","thu lai"));
        }
    }

    @PutMapping(path = "/delete-favourite-book")
    public ResponseEntity<?> xoaSachYeuThich(@RequestBody JsonNode jsonNode){
        try {
            return  sachService.xoaSachYeuThich(jsonNode);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("loi roi ","thu lai"));
        }
    }

}
