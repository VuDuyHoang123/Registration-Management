package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo2.Model.SinhVien;

public interface SinhVienRepository extends JpaRepository<SinhVien, String> {
    boolean existsByMaSV(String maSV);
}
