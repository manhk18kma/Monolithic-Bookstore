package vn.titv.webbansach_backend.service.DonHang;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.titv.webbansach_backend.dao.*;
import vn.titv.webbansach_backend.entity.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DonHangServiceImpl implements DonHangService{
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private HinhThucGiaoHangRepository hinhThucGiaoHangRepository;
    @Autowired
    private HinhThucThanhToanRepository hinhThucThanhToanRepository;
    @Autowired
    private SachRepository sachRepository;
    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Transactional
    public DonHang saveOrder(JsonNode jsonNode) {
        int maNguoiDung = Integer.parseInt(String.valueOf(jsonNode.get("maNguoiDung")));
        int maHinhThucGiaoHang = Integer.parseInt(String.valueOf(jsonNode.get("maHinhThucGiaoHang")));
        int maHinhThucThanhToan = Integer.parseInt(String.valueOf(jsonNode.get("maHinhThucThanhToan")));
        String diaChiNhanHang = String.valueOf(jsonNode.get("maHinhThucThanhToan"));


        Optional<NguoiDung> nguoiDung = nguoiDungRepository.findById(maNguoiDung);
        Optional<HinhThucThanhToan> hinhThucThanhToan = hinhThucThanhToanRepository.findById(maHinhThucThanhToan);
        Optional<HinhThucGiaoHang> hinhThucGiaoHang = hinhThucGiaoHangRepository.findById(maHinhThucGiaoHang);

        if(!nguoiDung.isPresent()||!hinhThucThanhToan.isPresent()||!hinhThucGiaoHang.isPresent()){
            return null;
        }
        DonHang donHang = new DonHang();
        donHang.setNguoiDung(nguoiDung.get());
        donHang.setHinhThucGiaoHang(hinhThucGiaoHang.get());
        donHang.setHinhThucThanhToan(hinhThucThanhToan.get());
        donHang.setDiaChiNhanHang(diaChiNhanHang);
        donHang.setChiPhiGiaoHang(hinhThucGiaoHang.get().getChiPhiThanhToan());
        donHang.setChiPhiThanhToan(hinhThucThanhToan.get().getChiPhiThanhToan());
        donHang.setNgayTao(new Date(System.currentTimeMillis()));
        return donHangRepository.save(donHang);
    }
    @Transactional
    public double saveOrderDetails(List<Integer> danhSachCartItem , DonHang donHang){
        List<ChiTietDonHang> chiTietDonHangList = new ArrayList<>();
        double tongOrder = 0;

        for (int id : danhSachCartItem) {
            CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("CartItem not found"));
            ChiTietDonHang chiTietDonHang = new ChiTietDonHang();
            chiTietDonHang.setSach(cartItem.getSach());
            chiTietDonHang.setSoLuong(cartItem.getSoLuong());
            chiTietDonHang.setGiaBan(cartItem.getSach().getGiaBan() * cartItem.getSoLuong());
            chiTietDonHang.setDonHang(donHang);

            cartItem.getSach().setSoLuong(cartItem.getSach().getSoLuong() - cartItem.getSoLuong());
            cartItem.getSach().setDaBan(cartItem.getSach().getSoLuong() + cartItem.getSoLuong());

            cartItemRepository.save(cartItem);
            chiTietDonHangRepository.save(chiTietDonHang);

            chiTietDonHangList.add(chiTietDonHang);
            tongOrder += chiTietDonHang.getGiaBan();
        }

        return tongOrder;
    }



    @Override
@Transactional
    public ResponseEntity<?> buyOneItem(JsonNode jsonNode) {


        int maSach = jsonNode.get("maSach").asInt();
        int soLuong = jsonNode.get("soLuong").asInt();

        Optional<Sach> sachOptional = sachRepository.findById(maSach);
        if (sachOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy sách với mã số " + maSach);
        }
        Sach sach = sachOptional.get();
        if (sach.getSoLuong() < soLuong) {
            return ResponseEntity.badRequest().body("Số lượng sách không đủ để mua");
        }

        DonHang donHang = saveOrder(jsonNode);
        if(donHang==null) {
            return ResponseEntity.badRequest().build();
        }

        //xu ly sach
        sach.setDaBan(sach.getDaBan()+soLuong);
        sach.setSoLuong(sach.getSoLuong()-soLuong);


        //xu ly chi tiet don hang
        ChiTietDonHang chiTietDonHang = new ChiTietDonHang();
        chiTietDonHang.setSach(sach);
        chiTietDonHang.setSoLuong(soLuong);
        chiTietDonHang.setGiaBan(sach.getGiaBan()*soLuong);
        donHang.setTongTien(chiTietDonHang.getGiaBan());
        chiTietDonHang.setDonHang(donHang);






        chiTietDonHangRepository.save(chiTietDonHang);

        return ResponseEntity.ok().build();

    }


    @SneakyThrows
    @Override
    public ResponseEntity<?> buyCartItem(JsonNode jsonNode) {
        DonHang donHang = saveOrder(jsonNode);
        if(donHang==null){
            return ResponseEntity.badRequest().build();
        }
        List<Integer> danhSachCartItem = objectMapper.readValue(jsonNode.get("danhSachCartItem").traverse(), new TypeReference<List<Integer>>() {});
        donHang.setTongTienSanPham(saveOrderDetails(danhSachCartItem , donHang));
        donHang.setTongTien(donHang.getTongTienSanPham()+ donHang.getChiPhiGiaoHang() + donHang.getChiPhiThanhToan());
        donHangRepository.save(donHang);
        return ResponseEntity.ok().build();
    }
    @Override
    public ResponseEntity<?> update(JsonNode jsonNode) {
        DonHang donHang = saveOrder(jsonNode);
        if(donHang==null){
            return ResponseEntity.badRequest().build();
        }

        return null;
    }

}
