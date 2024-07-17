package KMA.webbansach_backend.service.Sach;

import KMA.webbansach_backend.dao.*;
import KMA.webbansach_backend.entity.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import KMA.webbansach_backend.service.UploadImageService.UploadImageServiceImpl;
import KMA.webbansach_backend.service.Util.Base64ToMultipartFileConverter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SachServiceImpl implements SachService {
    private SachRepository sachRepository;
    private ObjectMapper objectMapper;
    private TheLoaiRepository theLoaiRepository;
    private HinhAnhRepository hinhAnhRepository;
    private UploadImageServiceImpl uploadImageService;

    private TacGiaRepository tacGiaRepository;

    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    public SachServiceImpl(SachRepository sachRepository, ObjectMapper objectMapper, TheLoaiRepository theLoaiRepository, HinhAnhRepository hinhAnhRepository, UploadImageServiceImpl uploadImageService, TacGiaRepository tacGiaRepository, NguoiDungRepository nguoiDungRepository) {
        this.sachRepository = sachRepository;
        this.objectMapper = objectMapper;
        this.theLoaiRepository = theLoaiRepository;
        this.hinhAnhRepository = hinhAnhRepository;
        this.uploadImageService = uploadImageService;
        this.tacGiaRepository = tacGiaRepository;
        this.nguoiDungRepository = nguoiDungRepository;
    }







    @Override
    @Transactional
    public ResponseEntity<?> themSach(JsonNode sachJson) {
        try {
            String title = sachJson.get("title").asText();
            String description = sachJson.get("description").asText();
            Float listedPrice = Float.parseFloat(sachJson.get("listedPrice").asText());
            int discountPercent = Integer.parseInt(sachJson.get("discountPercent").asText());
            Float price = Float.parseFloat(sachJson.get("price").asText());
            int quantity = Integer.parseInt(sachJson.get("quantity").asText());

            Sach sach = new Sach();
            sach.setTenSach(title);
            sach.setMoTa(description);
            sach.setGiaNiemYet(listedPrice);
            sach.setPhanTramGiamGia(discountPercent);
            sach.setGiaBan(price);
            sach.setSoLuong(quantity);
            sach.setDaBan(0);
            sach.setTrungBinhXepHang(5);

            // Thiết lập danh sách thể loại cho sách
            List<Integer> maTheLoais = objectMapper.readValue(sachJson.get("genres").traverse(), new TypeReference<List<Integer>>() {});
            List<TheLoai> theLoais = new ArrayList<>();
            for (int maTheLoai : maTheLoais) {
                Optional<TheLoai> theLoai = theLoaiRepository.findById(maTheLoai);
                theLoais.add(theLoai.get());
            }
            sach.setDanhSachTheLoai(theLoais);

            // Thiết lập danh sách tác giả cho sách
            List<Integer> tacGias = objectMapper.readValue(sachJson.get("author").traverse(), new TypeReference<List<Integer>>() {});
            List<TacGia> tacGias1 = new ArrayList<>();
            for (int maTacGia : tacGias) {
                Optional<TacGia> tacGia = tacGiaRepository.findById(maTacGia);
                tacGias1.add(tacGia.get());
            }
            sach.setDanhSachTacGia(tacGias1);
            for (TacGia tacGia : tacGias1) {
                tacGia.getDanhSachSach().add(sach); // Thêm sách vào danh sách của tác giả
            }

            // Thiết lập danh sách hình ảnh cho sách
            List<HinhAnh> hinhAnhs = new ArrayList<>();
            String base64 = formatStringByJson(String.valueOf((sachJson.get("urlAvt"))));
            if (base64.length() > 0) {
                HinhAnh avtSach = new HinhAnh();
                avtSach.setSach(sach);
                avtSach.setAnhDaiDienSach(true);
                MultipartFile multipartFileAvt = Base64ToMultipartFileConverter.convert(base64);
                String urlAvt = uploadImageService.uploadImage(multipartFileAvt, "Book_" + sach.getMaSach());
                avtSach.setUrlImage(urlAvt);
                hinhAnhs.add(avtSach);
            }

            List<String> arrDataRelatedImg = objectMapper.readValue(sachJson.get("relatedImg").traverse(), new TypeReference<List<String>>() {});

            for (int i = 0; i < arrDataRelatedImg.size(); i++) {
                String img = arrDataRelatedImg.get(i);
                HinhAnh hinhAnh = new HinhAnh();
                hinhAnh.setSach(sach);
                MultipartFile relatedImgFile = Base64ToMultipartFileConverter.convert(img);
                String imgURL = uploadImageService.uploadImage(relatedImgFile, "Book_" + sach.getMaSach() + "." + i);
                hinhAnh.setUrlImage(imgURL);
                hinhAnh.setAnhDaiDienSach(false);
                hinhAnhs.add(hinhAnh);
            }

            sach.setDanhSachHinhAnh(hinhAnhs);
            sachRepository.save(sach);

            return ResponseEntity.ok().body(new ThongBao("Lưu Sách Thành Công", "Tiếp Tục"));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    private String formatStringByJson(String json) {
        return json.replaceAll("\"","");
    }

    @Override
    @Transactional
    public ResponseEntity<?> suaSach(JsonNode sachJson) {
        try {
            String title = sachJson.get("title").asText();
            String description = sachJson.get("description").asText();
            Float listedPrice = Float.parseFloat(sachJson.get("listedPrice").asText());
            int discountPercent = Integer.parseInt(sachJson.get("discountPercent").asText());
            Float price = Float.parseFloat(sachJson.get("price").asText());
            int quantity = Integer.parseInt(sachJson.get("quantity").asText());

            int maSach = Integer.parseInt(sachJson.get("id").asText());
            Sach sach = sachRepository.findByMaSach(maSach);

            if (sach != null) {
                sach.setTenSach(title);
                sach.setMoTa(description);
                sach.setGiaNiemYet(listedPrice);
                sach.setPhanTramGiamGia(discountPercent);
                sach.setGiaBan(price);
                sach.setSoLuong(quantity);

                // Thiết lập danh sách thể loại cho sách
                List<Integer> maTheLoais = objectMapper.readValue(sachJson.get("genres").traverse(), new TypeReference<List<Integer>>() {});
                List<TheLoai> theLoais = new ArrayList<>();
                for (int maTheLoai : maTheLoais) {
                    Optional<TheLoai> theLoai = theLoaiRepository.findById(maTheLoai);
                    theLoais.add(theLoai.get());
                }
                sach.setDanhSachTheLoai(theLoais);

                // Thiết lập danh sách tác giả cho sách
                List<Integer> maTacGia = objectMapper.readValue(sachJson.get("author").traverse(), new TypeReference<List<Integer>>() {});
                List<TacGia> tacGias = new ArrayList<>();
                for (int maTg : maTacGia) {
                    Optional<TacGia> tacGia = tacGiaRepository.findById(maTg);
                    tacGias.add(tacGia.get());
                }


                sach.setDanhSachTacGia(tacGias);

                // Thiết lập danh sách hình ảnh cho sách
                List<HinhAnh> hinhAnhs = new ArrayList<>();
                hinhAnhRepository.deleteAllBySach_MaSach(sach.getMaSach());

                    // Xử lý ảnh đại diện
                    String base64AvtUrl = formatStringByJson(String.valueOf((sachJson.get("urlAvt"))));
                    if (base64AvtUrl.length() > 0 && !base64AvtUrl.startsWith("http")) {
                        HinhAnh avtSach = new HinhAnh();
                        avtSach.setSach(sach);
                        avtSach.setAnhDaiDienSach(true);
                        MultipartFile multipartFileAvt = Base64ToMultipartFileConverter.convert(base64AvtUrl);
                        String urlAvt = uploadImageService.uploadImage(multipartFileAvt, "Book_" + maSach);
                        avtSach.setUrlImage(urlAvt);
                        hinhAnhs.add(avtSach);
                    }else {
                        HinhAnh avtSach = new HinhAnh();
                        avtSach.setSach(sach);
                        avtSach.setAnhDaiDienSach(true);
                        avtSach.setUrlImage(base64AvtUrl);
                        hinhAnhs.add(avtSach);
                    }

//                    // Xử lý ảnh liên quan
                    List<String> arrDataRelatedImg = objectMapper.readValue(sachJson.get("relatedImg").traverse(), new TypeReference<List<String>>() {});
                    for (int i = 0; i < arrDataRelatedImg.size(); i++) {
                        String img = arrDataRelatedImg.get(i);
                        if(img.length()>0 && !img.startsWith("http")){
                            HinhAnh hinhAnh = new HinhAnh();
                            hinhAnh.setSach(sach);
                            MultipartFile relatedImgFile = Base64ToMultipartFileConverter.convert(img);
                            String imgURL = uploadImageService.uploadImage(relatedImgFile, "Book_" + maSach + "." + i);
                            hinhAnh.setUrlImage(imgURL);
                            hinhAnh.setAnhDaiDienSach(false);
                            hinhAnhs.add(hinhAnh);
                        }else {
                            HinhAnh hinhAnh = new HinhAnh();
                            hinhAnh.setSach(sach);
                            hinhAnh.setUrlImage(img);
                            hinhAnh.setAnhDaiDienSach(false);
                            hinhAnhs.add(hinhAnh);
                        }
                    }

                sach.setDanhSachHinhAnh(hinhAnhs);
                sachRepository.save(sach);

                return ResponseEntity.ok().body(new ThongBao("Cập nhật sách thành công", "Tiếp tục"));
            } else {
                return ResponseEntity.badRequest().body(new ThongBao("Không tìm thấy sách với mã " + maSach, "Lỗi"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ThongBao("Lỗi khi cập nhật sách", "Lỗi"));
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> themSachYeuThich(JsonNode sachJson) {
        int bookID = Integer.parseInt(sachJson.get("idBook").asText());
        int userID = Integer.parseInt(sachJson.get("idUser").asText());

        Sach sach = sachRepository.findById(bookID)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sách có id " + bookID));
        NguoiDung nguoiDung = nguoiDungRepository.findById(userID)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng có id " + userID));

        List<NguoiDung> nguoiDungs = sach.getDanhSachNguoiDungYeuThich();
        nguoiDungs.add(nguoiDung);
        sach.setDanhSachNguoiDungYeuThich(nguoiDungs);

        sachRepository.save(sach);
        return ResponseEntity.ok().build();
    }

    @Override
    @Transactional
    public ResponseEntity<?> xoaSachYeuThich(JsonNode sachJson) {
        if (sachJson == null || sachJson.get("idBook") == null || sachJson.get("idUser") == null) {
            return ResponseEntity.badRequest().body("Dữ liệu không hợp lệ");
        }

        int bookID = Integer.parseInt(sachJson.get("idBook").asText());
        int userID = Integer.parseInt(sachJson.get("idUser").asText());

        Sach sach = sachRepository.findById(bookID)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy sách có id " + bookID));
        NguoiDung nguoiDung = nguoiDungRepository.findById(userID)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng có id " + userID));

        List<NguoiDung> oldNguoiDung = sach.getDanhSachNguoiDungYeuThich();
        List<NguoiDung> nguoiDungs = new ArrayList<>();
        for (NguoiDung ng : oldNguoiDung) {
            if(ng.getMaNguoiDung() != userID){
                nguoiDungs.add(ng);
            }
        }
        sach.setDanhSachNguoiDungYeuThich(nguoiDungs);
        sachRepository.save(sach);
        return ResponseEntity.ok().build();
    }



}
