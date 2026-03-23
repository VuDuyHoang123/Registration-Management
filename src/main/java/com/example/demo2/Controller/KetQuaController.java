package com.example.demo2.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Repository.KetQuaRepository;
import com.example.demo2.Service.KetQuaService;

@RestController
@RequestMapping("/api/ketqua")
@CrossOrigin(origins = "http://localhost:5173")
public class KetQuaController {

    private final KetQuaService service;
    private final KetQuaRepository repo;

    public KetQuaController(KetQuaService service, KetQuaRepository repo){
        this.service = service;
        this.repo = repo;
    }

    // gọi procedure
    @PostMapping("/nhapdiem")
    public String nhapDiem(@RequestBody InputDTO dto){

        service.nhapDiem(
            dto.maSV,
            dto.maLopHP,
            dto.diemCC,
            dto.diemGK,
            dto.diemCK
        );

        return "Nhập điểm thành công";
    }

    // gọi function
    @GetMapping("/top/{maLopHP}")
    public Double getTop(@PathVariable String maLopHP){
        return repo.getTopDiem(maLopHP);
    }

}