package vn.titv.webbansach_backend.service.HinhAnh;

import vn.titv.webbansach_backend.entity.HinhAnh;

import java.util.List;

public interface HinhAnhService {
    public HinhAnh findHinhAnhById(int maHinhAnh);
    public HinhAnh saveHinhAnh(HinhAnh hinhAnh);
    public List<HinhAnh> layTatCaHinhAnh();
}
