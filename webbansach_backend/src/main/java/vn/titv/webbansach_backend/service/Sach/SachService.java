package vn.titv.webbansach_backend.service.Sach;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import vn.titv.webbansach_backend.entity.Sach;

import java.util.ArrayList;
import java.util.List;

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
