package KMA.webbansach_backend.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.Sach;

import java.util.List;
@RepositoryRestResource(path = "sach")
public interface SachRepository extends JpaRepository<Sach, Integer> {
    Page<Sach> findByTenSachContaining(String tenSach, Pageable pageable);

    Page<Sach> findByDanhSachTheLoai_MaTheLoai(int maTheLoai, Pageable pageable);

    Page<Sach> findByTenSachContainingAndDanhSachTheLoai_MaTheLoai(String tenSach, int maTheLoai, Pageable pageable);

//    Page<Sach> findBySoLuongBetween(int min, int max, Pageable pageable);

    List<Sach> findBySoLuongBetween(int min, int max);


    Sach findByMaSach(int maSach);


    Page<Sach> findSachesBy(Pageable pageable);







}

//eyJhbGciOiJIUzI1NiJ9.eyJ4IjoiQWJjIiwiaXNBZG1pbiI6dHJ1ZSwic3ViIjoibWFpbnVzZXIiLCJpYXQiOjE3MDE1MzE4ODEsImV4cCI6MTcwMTUzMzY4MX0.2LCC0KnRwn6dSgrysz67Oz0ZmJprurq-doBvkp8vjB4
//eyJhbGciOiJIUzI1NiJ9.eyJ4IjoiQWJjIiwiaXNBZG1pbiI6dHJ1ZSwic3ViIjoibWFpbnVzZXIiLCJpYXQiOjE3MDE1MzE4ODEsImV4cCI6MTcwMTUzMzY4MX0.2LCC0KnRwn6dSgrysz67Oz0ZmJprurq-doBvkp8vjB4
