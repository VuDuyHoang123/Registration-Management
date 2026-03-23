package com.example.demo2.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.demo2.Model.KetQuaHocTap;
import com.example.demo2.Repository.KetQuaHocRepository;

@RestController
@RequestMapping("/api/ketqua")
@CrossOrigin(origins = "http://localhost:5173")
public class KetQuaHocController {

    private final KetQuaHocRepository ketQuaHocRepository;

    // Dependency Injection qua Constructor
    public KetQuaHocController(KetQuaHocRepository ketQuaHocRepository) {
        this.ketQuaHocRepository = ketQuaHocRepository;
    }

    // Upsert logic: Cập nhật nếu đã tồn tại, tạo mới nếu chưa
    @PostMapping
    public KetQuaHocTap saveOrUpdate(@RequestBody KetQuaHocTap kq) {
        if (kq.getSinhVien() != null && kq.getLopHocPhan() != null
                && kq.getSinhVien().getMaSV() != null && kq.getLopHocPhan().getMaLopHP() != null) {

            String maSV = kq.getSinhVien().getMaSV();
            String maLop = kq.getLopHocPhan().getMaLopHP();

            // Sửa lỗi: Gọi qua instance 'ketQuaHocRepository' thay vì gọi static Class
            return ketQuaHocRepository.findBySinhVien_MaSVAndLopHocPhan_MaLopHP(maSV, maLop)
                    .map(existing -> {
                        existing.setDiemCC(kq.getDiemCC());
                        existing.setDiemGiuaKy(kq.getDiemGiuaKy());
                        existing.setDiemCuoiKy(kq.getDiemCuoiKy());
                        existing.setDiemTongKet(kq.getDiemTongKet());
                        return ketQuaHocRepository.save(existing); // Sửa lỗi typo tên biến ở đây
                    })
                    .orElseGet(() -> ketQuaHocRepository.save(kq));
        }

        // Trường hợp dữ liệu không đủ để tìm kiếm bản ghi cũ, lưu trực tiếp
        return ketQuaHocRepository.save(kq);
    }

    @GetMapping("/lop/{maLopHP}")
    public List<KetQuaHocTap> getByLop(@PathVariable String maLopHP) {
        return ketQuaHocRepository.findByLopHocPhan_MaLopHP(maLopHP);
    }

    @GetMapping("/student/{maSV}")
    public List<KetQuaHocTap> getByStudent(@PathVariable String maSV) {
        return ketQuaHocRepository.findBySinhVien_MaSV(maSV);
    }
}