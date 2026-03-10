package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.Khoa;
import com.example.demo2.Repository.KhoaRepository;

@RestController
@RequestMapping("/api/khoa")
public class KhoaController {

    private final KhoaRepository khoaRepository;

    public KhoaController(KhoaRepository khoaRepository) {
        this.khoaRepository = khoaRepository;
    }

    @GetMapping
    public List<Khoa> getAll() {
        return khoaRepository.findAll();
    }

   @GetMapping("/coso/{maCoSo}")
public List<Khoa> getByCoSo(@PathVariable String maCoSo) {
    return khoaRepository.findByMaCoSo(maCoSo);
}

    @PostMapping
    public Khoa create(@RequestBody Khoa khoa) {
        return khoaRepository.save(khoa);
    }

    @PutMapping("/{id}")
    public Khoa update(@PathVariable String id, @RequestBody Khoa khoa) {
        khoa.setMaKhoa(id);
        return khoaRepository.save(khoa);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        khoaRepository.deleteById(id);
    }
}