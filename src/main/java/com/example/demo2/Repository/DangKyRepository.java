package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo2.Model.DangKy;

public interface DangKyRepository extends JpaRepository<DangKy, Long> {

    @Query("SELECT COUNT(d) FROM DangKy d WHERE d.lopHocPhan.maLopHP = :maLopHP")
    Long countByLopHP(@Param("maLopHP") String maLopHP);

}