package vn.titv.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hinh_anh")
public class HinhAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_anh")
    private int maHinhAnh; // Mã ảnh

    @Column(name = "ten_hinh_anh")
    private String tenHinhAnh; // Tên ảnh

    @Column(name = "url_image")
    @Lob
    private String urlImage; // Link hình ảnh

    @Column(name = "du_lieu_anh", columnDefinition = "LONGTEXT")
    @Lob
    private String duLieuAnh; // Dữ liệu ảnh

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach;

    @Column(name = "anh_dai_dien_sach")
    private boolean anhDaiDienSach;

    public HinhAnh() {
    }

    public int getMaHinhAnh() {
        return maHinhAnh;
    }

    public void setMaHinhAnh(int maHinhAnh) {
        this.maHinhAnh = maHinhAnh;
    }

    public String getTenHinhAnh() {
        return tenHinhAnh;
    }

    public void setTenHinhAnh(String tenHinhAnh) {
        this.tenHinhAnh = tenHinhAnh;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getDuLieuAnh() {
        return duLieuAnh;
    }

    public void setDuLieuAnh(String duLieuAnh) {
        this.duLieuAnh = duLieuAnh;
    }

    public Sach getSach() {
        return sach;
    }

    public void setSach(Sach sach) {
        this.sach = sach;
    }

    public boolean isAnhDaiDienSach() {
        return anhDaiDienSach;
    }

    public void setAnhDaiDienSach(boolean anhDaiDienSach) {
        this.anhDaiDienSach = anhDaiDienSach;
    }
}