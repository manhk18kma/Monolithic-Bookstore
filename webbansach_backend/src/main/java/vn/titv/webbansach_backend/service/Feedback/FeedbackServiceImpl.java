package vn.titv.webbansach_backend.service.Feedback;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.titv.webbansach_backend.dao.NguoiDungRepository;
import vn.titv.webbansach_backend.dao.SachRepository;
import vn.titv.webbansach_backend.dao.SuDanhGiaRepository;
import vn.titv.webbansach_backend.entity.NguoiDung;
import vn.titv.webbansach_backend.entity.Sach;
import vn.titv.webbansach_backend.entity.SuDanhGia;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private SachRepository sachRepository;
    @Autowired
    private SuDanhGiaRepository suDanhGiaRepository;
    @Override
    @Transactional
    public ResponseEntity<?> addFeedback(JsonNode jsonNode) {
        if (jsonNode.hasNonNull("idBook") && jsonNode.hasNonNull("idUser") && jsonNode.hasNonNull("rate") && jsonNode.hasNonNull("feedback")) {
            int bookID = Integer.parseInt(jsonNode.get("idBook").asText());
            int userID = Integer.parseInt(jsonNode.get("idUser").asText());
            int rate = Integer.parseInt(jsonNode.get("rate").asText());
            String feedback = jsonNode.get("feedback").asText();

            NguoiDung nguoiDung = nguoiDungRepository.findByMaNguoiDung(userID);
            Sach sach = sachRepository.findByMaSach(bookID);

            if (nguoiDung == null || sach == null) {
                return ResponseEntity.notFound().build();
            }

            SuDanhGia suDanhGia = new SuDanhGia();
            suDanhGia.setDiemXepHang(rate);
            suDanhGia.setNguoiDung(nguoiDung);
            suDanhGia.setSach(sach);
            suDanhGia.setNhanXet(feedback);

            suDanhGiaRepository.save(suDanhGia);
            return ResponseEntity.ok().body(suDanhGia.getMaDanhGia());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    @Override
    @Transactional
    public ResponseEntity<?> updateFeedback(JsonNode jsonNode) {
            int feedbackID = Integer.parseInt(jsonNode.get("idFeedback").asText());
            int rate = Integer.parseInt(jsonNode.get("rate").asText());
            String feedback = jsonNode.get("feedback").asText();

            SuDanhGia suDanhGia = suDanhGiaRepository.findByMaDanhGia(feedbackID);
            suDanhGia.setDiemXepHang(rate);
            suDanhGia.setNhanXet(feedback);
            suDanhGiaRepository.save(suDanhGia);
            return ResponseEntity.ok().body(suDanhGia.getMaDanhGia());

    }

    @Override
    public ResponseEntity<?> getInfor(int id , int pageNumber) {
        Sach sach = sachRepository.findByMaSach(id);
        List<SuDanhGia> suDanhGiaList = sach.getDanhSachSuDanhGia();
        List<Map<String, String>> responseData = new ArrayList<>();
        for (SuDanhGia s : suDanhGiaList) {
            Map<String, String> response = new HashMap<>();
            NguoiDung nguoiDung = s.getNguoiDung();
            response.put("id", s.getMaDanhGia()+"");
            response.put("rate", s.getDiemXepHang()+"");
            response.put("feedback", s.getNhanXet());
            response.put("username", nguoiDung.getTenDangNhap());
            response.put("avtUser", nguoiDung.getAvatar());
            responseData.add(response);
        }
        return ResponseEntity.ok().body(responseData);


    }

}
