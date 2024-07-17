package vn.titv.webbansach_backend.dao;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import vn.titv.webbansach_backend.entity.CartItem;

import java.util.List;

@RepositoryRestResource(path = "cart_item")
public interface CartItemRepository extends JpaRepository<CartItem , Integer> {
    List<CartItem> findCartItemByNguoiDung_MaNguoiDung(int maNguoiDung);

}
