package KMA.webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "the_loai")
public class TheLoai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_the_loai")
    private int maTheLoai;

    @Column(name = "ten_the_loai", length = 256)
    private String tenTheLoai;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "danhSachTheLoai", cascade = {
            CascadeType.REFRESH,
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST
    })
    private List<Sach> danhSachQuyenSach;






    @Override
    public String toString() {
        return "TheLoai{" +
                "maTheLoai=" + maTheLoai +
                ", tenTheLoai='" + tenTheLoai + '\'' +
                '}';
    }
}
