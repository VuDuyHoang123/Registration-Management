package com.example.demo2.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.LopHocPhan;
import com.example.demo2.Repository.DangKyRepository;
import com.example.demo2.Repository.LopHocPhanRepository;

@RestController
@RequestMapping("/api/lophp")
@CrossOrigin(origins = "http://localhost:5173")
public class LopHocPhanController {

    private final LopHocPhanRepository lopHocPhanRepository;
    private final DangKyRepository dangKyRepository;

    public LopHocPhanController(LopHocPhanRepository lopHocPhanRepository,
                                DangKyRepository dangKyRepository) {

        this.lopHocPhanRepository = lopHocPhanRepository;
        this.dangKyRepository = dangKyRepository;
    }

    // lấy danh sách lớp học phần + sĩ số
    @GetMapping
    public List<Map<String,Object>> getAll(){

        return lopHocPhanRepository.findAll()
        .stream()
        .map(lhp -> {

            Long siSo = dangKyRepository.countByLopHP(lhp.getMaLopHP());

            Map<String, Object> map = new HashMap<>();

            map.put("maLopHP", lhp.getMaLopHP());
            map.put("tenLop", lhp.getTenLop());
            map.put("siSoToiDa", lhp.getSiSoToiDa());
            map.put("siSoDaDK", siSo);
            map.put("monHoc", lhp.getMonHoc() != null ? lhp.getMonHoc().getTenMon() : "");
            map.put("giangVien", lhp.getGiangVien() != null ? lhp.getGiangVien().getTenGiangVien() : "");

            return map;

        }).collect(Collectors.toList());
    }

    // =============================
    // THÊM LỚP HỌC PHẦN
    // =============================
    @PostMapping
    public LopHocPhan add(@RequestBody LopHocPhan lopHocPhan){
        return lopHocPhanRepository.save(lopHocPhan);
    }

    // =============================
    // SỬA LỚP HỌC PHẦN
    // =============================
    @PutMapping("/{maLopHP}")
    public LopHocPhan update(@PathVariable String maLopHP,
                             @RequestBody LopHocPhan data){

        LopHocPhan lhp = lopHocPhanRepository
                .findById(maLopHP)
                .orElseThrow();

        lhp.setTenLop(data.getTenLop());
        lhp.setSiSoToiDa(data.getSiSoToiDa());

        return lopHocPhanRepository.save(lhp);
    }

    // =============================
    // XÓA LỚP HỌC PHẦN
    // =============================
    @DeleteMapping("/{maLopHP}")
    public void delete(@PathVariable String maLopHP){
        lopHocPhanRepository.deleteById(maLopHP);
    }

}