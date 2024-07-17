package vn.titv.webbansach_backend.service.CartItem;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;

public interface CartItemService {
    public ResponseEntity<?> save(JsonNode jsonNode);
    public ResponseEntity<?> update(JsonNode jsonNode);
}
