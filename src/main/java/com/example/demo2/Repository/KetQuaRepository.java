package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo2.Model.KetQuaHocTap;

public interface KetQuaRepository extends JpaRepository<KetQuaHocTap, Long> {

    @Query(value = "SELECT GET_TOP_DIEM(:maLopHP) FROM DUAL", nativeQuery = true)
    Double getTopDiem(@Param("maLopHP") String maLopHP);
    

}