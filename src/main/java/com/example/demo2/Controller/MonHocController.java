package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.MonHoc;
import com.example.demo2.Repository.MonHocRepository;

@RestController
@RequestMapping("/api/monhoc")
public class MonHocController {

    private final MonHocRepository monHocRepository;

    public MonHocController(MonHocRepository monHocRepository) {
        this.monHocRepository = monHocRepository;
    }

    @GetMapping
    public List<MonHoc> getAll() {
        return monHocRepository.findAll();
    }

    @PostMapping
    public MonHoc create(@RequestBody MonHoc monHoc) {
        return monHocRepository.save(monHoc);
    }

    @PutMapping("/{id}")
    public MonHoc update(@PathVariable String id, @RequestBody MonHoc monHoc) {
        monHoc.setMaMon(id);
        return monHocRepository.save(monHoc);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        monHocRepository.deleteById(id);
    }
}