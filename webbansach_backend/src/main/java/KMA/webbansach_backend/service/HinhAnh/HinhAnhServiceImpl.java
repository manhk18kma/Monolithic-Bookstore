package KMA.webbansach_backend.service.HinhAnh;

import KMA.webbansach_backend.dao.HinhAnhRepository;
import KMA.webbansach_backend.dao.SachRepository;
import KMA.webbansach_backend.entity.HinhAnh;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
