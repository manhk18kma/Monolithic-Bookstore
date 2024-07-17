package KMA.webbansach_backend.service.CartItem;

import KMA.webbansach_backend.dao.CartItemRepository;
import KMA.webbansach_backend.dao.NguoiDungRepository;
import KMA.webbansach_backend.dao.SachRepository;
import KMA.webbansach_backend.entity.CartItem;
import KMA.webbansach_backend.entity.NguoiDung;
import KMA.webbansach_backend.entity.Sach;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService{
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private SachRepository sachRepository;
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Override
    public ResponseEntity<?> save(JsonNode jsonNode) {
        int maNguoiDung = Integer.parseInt(String.valueOf(jsonNode.get("maNguoiDung")));
        int maSach = Integer.parseInt(String.valueOf(jsonNode.get("maSach")));
        int soLuong = Integer.parseInt(String.valueOf(jsonNode.get("soLuong")));


        Optional<NguoiDung> nguoiDungOptional = nguoiDungRepository.findById(maNguoiDung);
        Optional<Sach> sachOptional = sachRepository.findById(maSach);

        if (!nguoiDungOptional.isPresent() || !sachOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Không tìm thấy người dùng hoặc sách.");
        }

        List<CartItem> cartItemList = cartItemRepository.findCartItemByNguoiDung_MaNguoiDung(maNguoiDung);

        for (CartItem c :cartItemList) {
            if(c.getSach().getMaSach() == maSach){
                c.setSoLuong(soLuong);
                cartItemRepository.save(c);
                return ResponseEntity.ok().body("Lưu cart item thành công.");
            }
        }

        NguoiDung nguoiDung = nguoiDungOptional.get();
        Sach sach = sachOptional.get();
        CartItem cartItem = new CartItem();
        cartItem.setNguoiDung(nguoiDung);
        cartItem.setSach(sach);
        cartItem.setSoLuong(soLuong);

        cartItemRepository.save(cartItem);

        return ResponseEntity.ok().body("Lưu cart item thành công.");
    }


    @Override
    public ResponseEntity<?> update(JsonNode jsonNode) {
        int maCart = Integer.parseInt(String.valueOf(jsonNode.get("maCart")));
        int soLuong = Integer.parseInt(String.valueOf(jsonNode.get("soLuong")));

        Optional<CartItem> cartItem = cartItemRepository.findById(maCart);
        if(!cartItem.isPresent()){
            return ResponseEntity.badRequest().body("Không tìm thấy cart.");
        }else {
            cartItem.get().setSoLuong(soLuong);
            cartItemRepository.save(cartItem.get());
            return ResponseEntity.ok().body("Lưu cart item thành công.");

        }


    }
}
