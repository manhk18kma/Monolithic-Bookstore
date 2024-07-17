package KMA.webbansach_backend.service.SuDanhGia;

import KMA.webbansach_backend.dao.NguoiDungRepository;
import KMA.webbansach_backend.dao.SachRepository;
import KMA.webbansach_backend.dao.SuDanhGiaRepository;
import KMA.webbansach_backend.entity.NguoiDung;
import KMA.webbansach_backend.entity.Sach;
import KMA.webbansach_backend.entity.SuDanhGia;
import KMA.webbansach_backend.entity.ThongBao;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SuDanhGiaServiceImpl implements SuDanhGiaService {
    private SuDanhGiaRepository suDanhGiaRepository;
    private NguoiDungRepository nguoiDungRepository;
    private SachRepository sachRepository;

    private ObjectMapper objectMapper;


    @Autowired
    public SuDanhGiaServiceImpl(SuDanhGiaRepository suDanhGiaRepository, NguoiDungRepository nguoiDungRepository, SachRepository sachRepository, ObjectMapper objectMapper) {
        this.suDanhGiaRepository = suDanhGiaRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.sachRepository = sachRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    @Override
    public ResponseEntity<?> saveDanhGia(JsonNode jsonNode) {
        int maNguoiDung =  objectMapper.convertValue(jsonNode.get("maNguoiDung"),Integer.class);
        int maSach = objectMapper.convertValue(jsonNode.get("maSach"), Integer.class);
        Sach sach = sachRepository.findByMaSach(maSach);
        NguoiDung nguoiDung = nguoiDungRepository.findByMaNguoiDung(maNguoiDung);
        SuDanhGia suDanhGia = new SuDanhGia();
        suDanhGia.setNguoiDung(nguoiDung);
        suDanhGia.setSach(sach);
        suDanhGia.setNhanXet(objectMapper.convertValue(jsonNode.get("nhanXet"), String.class));
        suDanhGia.setDiemXepHang(objectMapper.convertValue(jsonNode.get("diemXepHang"), Float.class));
        suDanhGiaRepository.save(suDanhGia);
        return ResponseEntity.ok().body(new ThongBao("save sach thanh cong" , "tiep tuc"));
    }

    @Override
    public String getUsernameDanhGia(int maDanhGia) {
        SuDanhGia suDanhGia = suDanhGiaRepository.findByMaDanhGia(maDanhGia);
        NguoiDung nguoiDung = nguoiDungRepository.findByMaNguoiDung(suDanhGia.getNguoiDung().getMaNguoiDung());
        return  nguoiDung.getTenDangNhap();
    }

    @Override
    public ResponseEntity<?> suaDanhGia(JsonNode jsonNode) {
        int maDanhGiaUpdate = objectMapper.convertValue(jsonNode.get("maDanhGia"), new TypeReference<Integer>() {});
        int diemDanhGia = objectMapper.convertValue(jsonNode.get("diemXepHang"), new TypeReference<Integer>() {});
        String nhanXet = objectMapper.convertValue(jsonNode.get("nhanXet"), new TypeReference<String>() {});


        SuDanhGia suDanhGiaUpdate = suDanhGiaRepository.findByMaDanhGia(maDanhGiaUpdate);
        suDanhGiaUpdate.setNhanXet(nhanXet);
        suDanhGiaUpdate.setDiemXepHang(diemDanhGia);
        suDanhGiaRepository.save(suDanhGiaUpdate);
        return  null;

    }
}
