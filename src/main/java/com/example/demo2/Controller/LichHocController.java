package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.LichHoc;
import com.example.demo2.Model.ViewLichHoc;
import com.example.demo2.Repository.LichHocRepository;
import com.example.demo2.Repository.ViewLichHocRepository;

@RestController
@RequestMapping("/api/lichhoc")
@CrossOrigin(origins = "http://localhost:5173")
public class LichHocController {

    private final LichHocRepository lichHocRepository;
    private final ViewLichHocRepository viewLichHocRepository;

    public LichHocController(
            LichHocRepository lichHocRepository,
            ViewLichHocRepository viewLichHocRepository) {

        this.lichHocRepository = lichHocRepository;
        this.viewLichHocRepository = viewLichHocRepository;
    }

    // ==============================
    // LẤY LỊCH HỌC TỪ VIEW
    // ==============================

    @GetMapping("/view")
    public List<ViewLichHoc> getView(){

        return viewLichHocRepository.findAll();

    }

    // ==============================
    // LẤY LỊCH HỌC THÔ
    // ==============================

    @GetMapping
    public List<LichHoc> getAll(){

        return lichHocRepository.findAll();

    }

    // ==============================
    // THÊM LỊCH HỌC
    // ==============================

    @PostMapping
    public LichHoc add(@RequestBody LichHoc lichHoc){

        return lichHocRepository.save(lichHoc);

    }

    // ==============================
    // SỬA LỊCH HỌC
    // ==============================

    @PutMapping("/{id}")
    public LichHoc update(@PathVariable Long id,
                          @RequestBody LichHoc data){

        LichHoc lh = lichHocRepository.findById(id).orElseThrow();

        lh.setThu(data.getThu());
        lh.setTietBatDau(data.getTietBatDau());
        lh.setSoTiet(data.getSoTiet());
        lh.setPhongHoc(data.getPhongHoc());
        lh.setLopHocPhan(data.getLopHocPhan());

        return lichHocRepository.save(lh);

    }

    // ==============================
    // XÓA LỊCH HỌC
    // ==============================

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){

        lichHocRepository.deleteById(id);

    }

}