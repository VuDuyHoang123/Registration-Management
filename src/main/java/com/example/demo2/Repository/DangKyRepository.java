package com.example.demo2.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo2.Model.DangKy;

public interface DangKyRepository extends JpaRepository<DangKy, Long> {

    @Query("SELECT COUNT(d) FROM DangKy d WHERE d.lopHocPhan.maLopHP = :maLopHP")
    Long countByLopHP(@Param("maLopHP") String maLopHP);


    // kiểm tra sinh viên đã đăng ký lớp này chưa
    Optional<DangKy> findBySinhVien_MaSVAndLopHocPhan_MaLopHP(String maSV,String maLopHP);

    // lấy danh sách đăng ký của sinh viên
    List<DangKy> findBySinhVien_MaSV(String maSV);

    // lấy dữ liệu đơn giản để hiển thị "các lớp đã đăng ký"
    @Query("""
        SELECT d.maDK, d.lopHocPhan.maLopHP
        FROM DangKy d
        WHERE d.sinhVien.maSV = :maSV
    """)
    List<Object[]> getDangKyBySinhVien(@Param("maSV") String maSV);

}