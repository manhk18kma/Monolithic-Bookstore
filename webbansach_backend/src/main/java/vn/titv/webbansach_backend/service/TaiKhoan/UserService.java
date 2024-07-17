package vn.titv.webbansach_backend.service.TaiKhoan;

import org.springframework.security.core.userdetails.UserDetailsService;
import vn.titv.webbansach_backend.entity.NguoiDung;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    public NguoiDung findByUsername(String tenDangNhap);
    public NguoiDung findById(int maNguoiDung);
}
