package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.HinhAnh;

import java.util.List;

@RepositoryRestResource(path = "hinh-anh")
public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {
    public HinhAnh findHinhAnhByMaHinhAnh(int maHinhAnh);


    public List<HinhAnh> findHinhAnhBySach_MaSachAndAnhDaiDienSachIsFalse(int maSach);
     HinhAnh findHinhAnhBySach_MaSachAndAnhDaiDienSachIsTrue(int maSach);
    public void deleteAllBySach_MaSach(int maSach);

    ///xoa anh thuong neu anh thuong thay doi
    public void deleteHinhAnhBySach_MaSachAndAnhDaiDienSachIsTrue(int maSach);

    //xoa anh dai dien neu anh dai dien thay doi
    public void deleteHinhAnhBySach_MaSachAndAnhDaiDienSachIsFalse(int maSach);


}
