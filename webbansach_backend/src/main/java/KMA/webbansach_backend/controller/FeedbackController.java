package KMA.webbansach_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import KMA.webbansach_backend.service.Feedback.FeedbackServiceImpl;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackServiceImpl feedbackService;

    @PostMapping  ("/add-feedback")
    public ResponseEntity<?> addFeedback(@RequestBody JsonNode jsonNode){
        return feedbackService.addFeedback(jsonNode);
    }

    @PutMapping  ("/update-feedback")
    public ResponseEntity<?> updateFeedback(@RequestBody JsonNode jsonNode){
        return feedbackService.updateFeedback(jsonNode);
    }
    @GetMapping("/get-feedback")
    public ResponseEntity<?> getInforFeedback(@RequestParam int idBook , int pageNumber){
        return feedbackService.getInfor(idBook , pageNumber );
    }






}
