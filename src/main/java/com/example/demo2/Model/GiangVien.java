package com.example.demo2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "GiangVien")
public class GiangVien {

    @Id
    @Column(name = "MaGiangVien", length = 20)
    private String maGiangVien;

    @Column(name = "TenGiangVien", length = 100, nullable = false)
    private String tenGiangVien;

    @ManyToOne
    @JoinColumn(name = "MaCoSo")
    private CoSo coSo;

    public String getMaGiangVien() {
        return maGiangVien;
    }

    public void setMaGiangVien(String maGiangVien) {
        this.maGiangVien = maGiangVien;
    }

    public String getTenGiangVien() {
        return tenGiangVien;
    }

    public void setTenGiangVien(String tenGiangVien) {
        this.tenGiangVien = tenGiangVien;
    }

    public CoSo getCoSo() {
        return coSo;
    }

    public void setCoSo(CoSo coSo) {
        this.coSo = coSo;
    }
}
