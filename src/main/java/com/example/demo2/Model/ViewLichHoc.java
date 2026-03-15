package com.example.demo2.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "VIEW_LICH_HOC")
@Data
public class ViewLichHoc {

    @Id
    private Long id;

    @Column(name = "MA_LOPHP")
    private String maLopHP;

    @Column(name = "TEN_LOP")
    private String tenLop;

    @Column(name = "TEN_MON")
    private String tenMon;

    @Column(name = "TEN_GIANG_VIEN")
    private String tenGiangVien;

    @Column(name = "SI_SO_DADK")
    private Integer siSoDaDK;

    @Column(name = "SI_SO_TOI_DA")
    private Integer siSoToiDa;

    private Integer thu;
    private Integer tietBatDau;
    private String phongHoc;
    private Integer soTiet;
}