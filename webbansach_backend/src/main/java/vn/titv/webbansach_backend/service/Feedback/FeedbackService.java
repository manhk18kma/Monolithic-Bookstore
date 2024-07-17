package vn.titv.webbansach_backend.service.Feedback;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;

public interface FeedbackService {
    @Transactional
    ResponseEntity<?> addFeedback(JsonNode jsonNode);


    @Transactional
    ResponseEntity<?> updateFeedback(JsonNode jsonNode);

    ResponseEntity<?> getInfor(int id , int pageNumber);
}
