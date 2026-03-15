package com.example.demo2.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.DangKy;
import com.example.demo2.Model.LopHocPhan;
import com.example.demo2.Model.SinhVien;
import com.example.demo2.Repository.DangKyRepository;

@RestController
@RequestMapping("/api/dangky")
@CrossOrigin(origins="http://localhost:5173")
public class DangKyController {

private final DangKyRepository dangKyRepository;

public DangKyController(DangKyRepository dangKyRepository){
this.dangKyRepository = dangKyRepository;
}

@PostMapping
public DangKy dangKy(@RequestBody DangKy dk){

dk.setNgayDK(LocalDateTime.now());

return dangKyRepository.save(dk);

}

@DeleteMapping("/{id}")
public void huyDangKy(@PathVariable Long id){

dangKyRepository.deleteById(id);

}

@GetMapping("/student/{maSV}")
public List<Object[]> getDangKySinhVien(@PathVariable String maSV){
    return dangKyRepository.getDangKyBySinhVien(maSV);
}

}