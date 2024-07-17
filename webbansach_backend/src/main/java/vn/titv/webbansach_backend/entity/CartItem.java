package vn.titv.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int maGioHang;

    @Column(name = "so_luong")
    private int soLuong;

    @ManyToOne(cascade = {
            CascadeType.REFRESH , CascadeType.MERGE , CascadeType.PERSIST , CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_sach" , nullable = false)
    private Sach sach;

    @ManyToOne
    @JoinColumn(name = "ma_nguoi_dung" , nullable = false)
    private NguoiDung nguoiDung;
}
