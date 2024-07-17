package KMA.webbansach_backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.SuDanhGia;


@RepositoryRestResource(path = "su-danh-gia")
public interface SuDanhGiaRepository extends JpaRepository<SuDanhGia, Long> {
    SuDanhGia findByMaDanhGia(int maDanhGia);


    Page<SuDanhGia> findBySach_MaSach(int maSach , Pageable pageable);
}
