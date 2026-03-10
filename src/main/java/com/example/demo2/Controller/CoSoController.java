package com.example.demo2.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo2.Model.CoSo;
import com.example.demo2.Repository.CoSoRepository;

@RestController
@RequestMapping("/api/coso")
public class CoSoController {

    private final CoSoRepository coSoRepository;

    public CoSoController(CoSoRepository coSoRepository) {
        this.coSoRepository = coSoRepository;
    }

    @GetMapping
    public List<CoSo> getAll() {
        return coSoRepository.findAll();
    }

    @PostMapping
    public CoSo create(@RequestBody CoSo coso) {
        return coSoRepository.save(coso);
    }

    @PutMapping("/{id}")
    public CoSo update(@PathVariable String id, @RequestBody CoSo coso) {
        coso.setMaCoSo(id);
        return coSoRepository.save(coso);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        coSoRepository.deleteById(id);
    }
}