package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.GiangVien;
import com.example.demo2.Repository.GiangVienRepository;

@RestController
@RequestMapping("/api/giangvien")
@CrossOrigin
public class GiangVienController {

    private final GiangVienRepository giangVienRepository;

    public GiangVienController(GiangVienRepository giangVienRepository) {
        this.giangVienRepository = giangVienRepository;
    }

    @GetMapping
    public List<GiangVien> getAll() {
        return giangVienRepository.findAll();
    }

    @PostMapping
    public GiangVien create(@RequestBody GiangVien gv) {
        return giangVienRepository.save(gv);
    }

    @PutMapping("/{id}")
    public GiangVien update(@PathVariable String id, @RequestBody GiangVien gv) {
        gv.setMaGiangVien(id);
        return giangVienRepository.save(gv);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        giangVienRepository.deleteById(id);
    }
}