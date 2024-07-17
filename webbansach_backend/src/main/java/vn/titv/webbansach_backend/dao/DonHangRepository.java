package vn.titv.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import vn.titv.webbansach_backend.entity.DonHang;

import java.beans.JavaBean;

@RepositoryRestResource(path = "don-hang")
public interface DonHangRepository extends JpaRepository<DonHang , Integer> {
}
