package vn.titv.webbansach_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.titv.webbansach_backend.entity.ThongBao;
import vn.titv.webbansach_backend.service.CartItem.CartItemService;
import vn.titv.webbansach_backend.service.CartItem.CartItemServiceImpl;

@RestController
@RequestMapping("/cart-item")
public class CartItemController {
    @Autowired
    private CartItemServiceImpl cartItemService;


    @PostMapping("/add-cart-item")
    private ResponseEntity<?> saveCartItem(@RequestBody JsonNode jsonNode){
        try {
            return cartItemService.save(jsonNode);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("Loi" , "add cart item"));
        }
    }

    @PutMapping("/update-cart-item")
    private ResponseEntity<?> updateCartItem(@RequestBody JsonNode jsonNode){
        try {
            return cartItemService.update(jsonNode);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ThongBao("Loi" , "update cart item"));
        }
    }

}
