package com.example.demo2.Service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class KetQuaService {

    private final JdbcTemplate jdbcTemplate;

    public KetQuaService(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public void nhapDiem(String maSV, String maLopHP,
                         Double cc, Double gk, Double ck){

        String sql = "BEGIN NHAP_DIEM(?,?,?,?,?); END;";
        jdbcTemplate.update(sql, maSV, maLopHP, cc, gk, ck);
    }
}