package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.CartItem;

import java.util.List;

@RepositoryRestResource(path = "cart_item")
public interface CartItemRepository extends JpaRepository<CartItem , Integer> {
    List<CartItem> findCartItemByNguoiDung_MaNguoiDung(int maNguoiDung);

}
