package KMA.webbansach_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import KMA.webbansach_backend.entity.TacGia;
@RepositoryRestResource(path = "tac-gia")
public interface TacGiaRepository extends JpaRepository<TacGia , Integer> {
}
