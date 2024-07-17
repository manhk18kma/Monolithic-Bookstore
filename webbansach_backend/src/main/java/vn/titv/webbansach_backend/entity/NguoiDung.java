package vn.titv.webbansach_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "nguoi_dung")
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nguoi_dung", length = 256)
    private int maNguoiDung;
    //
    @Column(name = "ten", length = 256)
    private String ten;
//
    @Column(name = "ten_dang_nhap", length = 256)
    private String tenDangNhap;
//
    @Column(name = "mat_khau", length = 512)
    private String matKhau;
    //
    @Column(name = "gioi_tinh")
    @Enumerated(EnumType.STRING)
    private GioiTinh gioiTinh;

//
    @Column(name = "email")
    private String email;
//
    @Column(name = "so_dien_thoai")
    private String soDienThoai;
    //
    @Column(name = "avatar", columnDefinition = "LONGTEXT")
    @Lob
    private String avatar;
//
    @Column(name = "ngay_sinh", nullable = true)
    private Date ngaySinh;

    @Column(name = "dia_chi_giao_hang")
    private String diaChiGiaoHang;

    @OneToMany(mappedBy = "nguoiDung", fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH
            }
    )
    private List<SuDanhGia> danhSachSuDanhGia;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "nguoidung_quyen",
            joinColumns = @JoinColumn(name = "ma_nguoi_dung"),
            inverseJoinColumns = @JoinColumn(name = "ma_quyen")
    )
    private List<Quyen> danhSachQuyen;


    @OneToMany(mappedBy = "nguoiDung", fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH
            }
    )
    private List<DonHang> danhSachDonHang;

    @Column(name = "da_kich_hoat")
    private boolean daKichHoat;

    @OneToMany(mappedBy = "nguoiDung", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
            CascadeType.REMOVE
    })
    private List<CartItem> cartItemList;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "danhSachNguoiDungYeuThich", cascade = {
            CascadeType.REFRESH,
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    private List<Sach> danhSachSachYeuThich;


    @Override
    public String toString() {
        return "NguoiDung{" +
                "maNguoiDung=" + maNguoiDung +
                ", ten='" + ten + '\'' +
                ", tenDangNhap='" + tenDangNhap + '\'' +
                ", matKhau='" + matKhau + '\'' +
                ", gioiTinh=" + gioiTinh +
                ", email='" + email + '\'' +
                ", soDienThoai='" + soDienThoai + '\'' +
                ", avatar='" + avatar + '\'' +
                ", ngaySinh=" + ngaySinh +
                ", daKichHoat=" + daKichHoat +
                '}';
    }
}
