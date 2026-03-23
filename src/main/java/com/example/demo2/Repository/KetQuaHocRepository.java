package com.example.demo2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo2.Model.KetQuaHocTap;

public interface KetQuaHocRepository extends JpaRepository<KetQuaHocTap, Long> {

    List<KetQuaHocTap> findByLopHocPhan_MaLopHP(String maLopHP);

    Optional<KetQuaHocTap> findBySinhVien_MaSVAndLopHocPhan_MaLopHP(String maSV, String maLopHP);

    List<KetQuaHocTap> findBySinhVien_MaSV(String maSV);
    

}