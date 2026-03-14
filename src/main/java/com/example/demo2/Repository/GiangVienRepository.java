package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo2.Model.GiangVien;

public interface GiangVienRepository extends JpaRepository<GiangVien, String> {

}