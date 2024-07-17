package KMA.webbansach_backend.service.Sach;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface SachService {

    @Transactional
    ResponseEntity<?> themSach(JsonNode bookJson);

    @Transactional
    ResponseEntity<?> suaSach(JsonNode sachJson);

    @Transactional
    ResponseEntity<?> themSachYeuThich(JsonNode sachJson);


    @Transactional
    ResponseEntity<?> xoaSachYeuThich(JsonNode sachJson);

}
