package vn.titv.webbansach_backend.service.HinhAnh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.titv.webbansach_backend.dao.HinhAnhRepository;
import vn.titv.webbansach_backend.dao.SachRepository;
import vn.titv.webbansach_backend.entity.HinhAnh;
import vn.titv.webbansach_backend.service.HinhAnh.HinhAnhService;

import java.util.List;

@Service
public class HinhAnhServiceImpl implements HinhAnhService {
    private SachRepository sachRepository;
    private HinhAnhRepository hinhAnhRepository;


    @Autowired
    public HinhAnhServiceImpl(SachRepository sachRepository, HinhAnhRepository hinhAnhRepository) {
        this.sachRepository = sachRepository;
        this.hinhAnhRepository = hinhAnhRepository;
    }

    @Override
    public HinhAnh findHinhAnhById(int maHinhAnh) {
        return hinhAnhRepository.findHinhAnhByMaHinhAnh(maHinhAnh);
    }

    @Override
    public HinhAnh saveHinhAnh(HinhAnh hinhAnh) {
        return hinhAnhRepository.save(hinhAnh);
    }

    @Override
    public List<HinhAnh> layTatCaHinhAnh() {
        return hinhAnhRepository.findAll();
    }
}
