package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.ChiTietDonHang;

@RepositoryRestResource(path = "chi-tiet-don-hang")
public interface ChiTietDonHangRepository  extends JpaRepository<ChiTietDonHang, Long> {

}
