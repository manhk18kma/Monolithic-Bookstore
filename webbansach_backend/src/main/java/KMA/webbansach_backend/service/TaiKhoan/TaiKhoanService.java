package KMA.webbansach_backend.service.TaiKhoan;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface TaiKhoanService {
    ResponseEntity<?> dangKyNguoiDung(JsonNode jsonNode);

    ResponseEntity<?> kichHoatTaiKhoan(JsonNode jsonNode);

    ResponseEntity<?> dangNhapTaiKhoan(JsonNode jsonNode) throws JsonProcessingException;

    @Transactional
    ResponseEntity<?> changePassword(JsonNode jsonNode);

    @Transactional
    ResponseEntity<?> generateOtpToChange(JsonNode jsonNode);
}
