package vn.titv.webbansach_backend.service.SuDanhGia;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import vn.titv.webbansach_backend.entity.SuDanhGia;

public interface SuDanhGiaService {
    @Transactional
    public ResponseEntity<?> saveDanhGia(JsonNode jsonNode);
    public String getUsernameDanhGia(int maDanhGia);

    public ResponseEntity<?> suaDanhGia(JsonNode jsonNode);
}
