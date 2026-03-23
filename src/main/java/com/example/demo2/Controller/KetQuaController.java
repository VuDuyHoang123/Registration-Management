package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo2.Model.KetQuaHocTap;
import com.example.demo2.Repository.KetQuaRepository;

@RestController
@RequestMapping("/api/ketqua")
@CrossOrigin(origins = "http://localhost:5173")
public class KetQuaController {

    private final KetQuaRepository ketQuaRepository;

    public KetQuaController(KetQuaRepository ketQuaRepository) {
        this.ketQuaRepository = ketQuaRepository;
    }

    // upsert: nếu đã tồn tại kết quả cho sinh viên + lớp thì cập nhật, nếu không thì tạo mới
    @PostMapping
    public KetQuaHocTap saveOrUpdate(@RequestBody KetQuaHocTap kq) {

        if (kq.getSinhVien() != null && kq.getLopHocPhan() != null
                && kq.getSinhVien().getMaSV() != null && kq.getLopHocPhan().getMaLopHP() != null) {

            String maSV = kq.getSinhVien().getMaSV();
            String maLop = kq.getLopHocPhan().getMaLopHP();

            return ketQuaRepository.findBySinhVien_MaSVAndLopHocPhan_MaLopHP(maSV, maLop)
                    .map(existing -> {
                        existing.setDiemCC(kq.getDiemCC());
                        existing.setDiemGiuaKy(kq.getDiemGiuaKy());
                        existing.setDiemCuoiKy(kq.getDiemCuoiKy());
                        existing.setDiemTongKet(kq.getDiemTongKet());
                        return ketQuaRepository.save(existing);
                    })
                    .orElseGet(() -> ketQuaRepository.save(kq));

        }

        return ketQuaRepository.save(kq);
    }

    @GetMapping("/lop/{maLopHP}")
    public List<KetQuaHocTap> getByLop(@PathVariable String maLopHP) {
        return ketQuaRepository.findByLopHocPhan_MaLopHP(maLopHP);
    }

    @GetMapping("/student/{maSV}")
    public List<KetQuaHocTap> getByStudent(@PathVariable String maSV) {
        return ketQuaRepository.findBySinhVien_MaSV(maSV);
    }

}
