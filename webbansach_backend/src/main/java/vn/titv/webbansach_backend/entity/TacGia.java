package vn.titv.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "tac_gia")
public class TacGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_tac_gia")
    private int maTacGia;
    @Column(name = "ten_tac_gia")
    private String tenTacGia;
    @Column(name = "url_avt")
    private String urlAvt;
    @Column(name = "url_quoc_tich")
    private String urlQuocTich;
    @Column(name = "tram_ngon")
    private String tramNgon;
    @Column(name = "rating")
    private Float rating;



    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "danhSachTacGia", cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.DETACH,
            CascadeType.REFRESH,
    })
    private List<Sach> danhSachSach;



    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.REFRESH,
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.PERSIST
            }
    )
    @JoinTable(name = "tacgia_theloai",
            joinColumns = @JoinColumn(name = "ma_tac_gia"),
            inverseJoinColumns = @JoinColumn(name = "ma_the_loai")
    )
    private List<TheLoai> danhSachTheLoai;
}
