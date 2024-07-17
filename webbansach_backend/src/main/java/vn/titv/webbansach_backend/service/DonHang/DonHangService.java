package vn.titv.webbansach_backend.service.DonHang;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface DonHangService {
    public ResponseEntity<?> update(JsonNode jsonNode);
    @Transactional
    ResponseEntity<?> buyOneItem(JsonNode jsonNode);

    ResponseEntity<?> buyCartItem(JsonNode jsonNode);
}
