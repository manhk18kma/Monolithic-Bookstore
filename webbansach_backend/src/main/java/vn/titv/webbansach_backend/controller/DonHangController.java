package vn.titv.webbansach_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.titv.webbansach_backend.service.DonHang.DonHangService;
import vn.titv.webbansach_backend.service.DonHang.DonHangServiceImpl;

@RestController
@RequestMapping("/hoa-don")
public class DonHangController {

    @Autowired
    private DonHangServiceImpl donHangService;

    @PostMapping("/buy-one-item")
    public ResponseEntity<?> buyOneItem(@RequestBody JsonNode jsonNode){
        return donHangService.buyOneItem(jsonNode);
    }


    @PostMapping("/buy-cart-item")
    public ResponseEntity<?> buyCartItem(@RequestBody JsonNode jsonNode){
        return donHangService.buyCartItem(jsonNode);
    }


}
