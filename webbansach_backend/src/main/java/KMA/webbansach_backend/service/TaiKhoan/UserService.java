package KMA.webbansach_backend.service.TaiKhoan;

import KMA.webbansach_backend.entity.NguoiDung;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    public NguoiDung findByUsername(String tenDangNhap);
    public NguoiDung findById(int maNguoiDung);
}
