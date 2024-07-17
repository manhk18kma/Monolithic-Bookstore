package KMA.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "don_hang")
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_don_hang")
    private int maDonHang;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "dia_chi_nhan_hang")
    private String diaChiNhanHang;

    @Column(name = "tong_tien_san_pham")
    private double tongTienSanPham;

    @Column(name = "chi_phi_giao_hang")
    private double chiPhiGiaoHang;

    @Column(name = "chi_phi_thanh_toan")
    private double chiPhiThanhToan;

    @Column(name = "tong_tien")
    private double tongTien;

    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE,
                    CascadeType.DETACH,
                    CascadeType.REFRESH,
                    CascadeType.REMOVE
            }
    )
    private List<ChiTietDonHang> danhSachChiTietDonHang;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_hinh_thuc_thanh_toan", nullable = true)
    private HinhThucThanhToan hinhThucThanhToan;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_hinh_thuc_giao_hang", nullable = true)
    private HinhThucGiaoHang hinhThucGiaoHang;


    @Column(name = "trang_thai_don_hang")
    private String trangThaiDonHang;


}
