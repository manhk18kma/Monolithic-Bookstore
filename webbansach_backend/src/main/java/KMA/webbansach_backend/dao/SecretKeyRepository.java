package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.SecretKey;

@RepositoryRestResource(path = "secretKey")
public interface SecretKeyRepository extends JpaRepository<SecretKey , Integer> {

    SecretKey findSecretKeyByNguoiDung_MaNguoiDung(int maNguoiDung);
}
