package KMA.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "sach")
public class Sach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_sach")
    private int maSach;

    @Column(name = "ten_sach", length = 256)
    private String tenSach;

    @Column(name = "mo_ta", columnDefinition = "text")
    private String moTa;

    @Column(name = "gia_niem_yet")
    private double giaNiemYet;

    @Column(name = "phan_tram_giam_gia")
    private int phanTramGiamGia;

    @Column(name = "gia_ban")
    private double giaBan;

    @Column(name = "so_luong")
    private int soLuong;

    @Column(name = "da_ban")
    private int daBan;

    @Column(name = "trung_binh_xep_hang")
    private double trungBinhXepHang;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    @JoinTable(
            name = "sach_theloai",
            joinColumns = @JoinColumn(name = "ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_the_loai")
    )
    private List<TheLoai> danhSachTheLoai;




    @OneToMany(mappedBy = "sach", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
            CascadeType.REMOVE
    })
    private List<HinhAnh> danhSachHinhAnh;



    @OneToMany(mappedBy = "sach", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
            CascadeType.REMOVE
    })
    private List<SuDanhGia> danhSachSuDanhGia;

    @OneToMany(mappedBy = "sach", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    private List<ChiTietDonHang> danhSachChiTietDonHang;




    @OneToMany(mappedBy = "sach", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    private List<CartItem> cartItemList;



    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    @JoinTable(name = "tacgia_sach",
            joinColumns = @JoinColumn(name = "ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_tac_gia")
    )
    private List<TacGia> danhSachTacGia;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    @JoinTable(
            name = "sach_nguoidung",
            joinColumns = @JoinColumn(name = "ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_nguoi_dung")
    )
    private List<NguoiDung> danhSachNguoiDungYeuThich;


    @Override
    public String toString() {
        return "Sach{" +
                "maSach=" + maSach +
                ", tenSach='" + tenSach + '\'' +
                ", moTa='" + moTa + '\'' +
                ", giaNiemYet=" + giaNiemYet +
                ", phanTramGiamGia=" + phanTramGiamGia +
                ", giaBan=" + giaBan +
                ", soLuong=" + soLuong +
                ", daBan=" + daBan +
                ", trungBinhXepHang=" + trungBinhXepHang +
                '}';
    }
}
