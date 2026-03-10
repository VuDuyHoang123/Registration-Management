package com.example.demo2.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo2.Model.Khoa;

public interface KhoaRepository extends JpaRepository<Khoa, String> {

    @Query("SELECT k FROM Khoa k WHERE k.coSo.maCoSo = :maCoSo")
    List<Khoa> findByMaCoSo(@Param("Ma_Co_So") String maCoSo);

}