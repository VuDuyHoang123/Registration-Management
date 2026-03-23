package com.example.demo2.Model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "LICH_HOC")
@Data
public class LichHoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MA_LOPHP")
    private LopHocPhan lopHocPhan;

    @Column(name = "NGAY")
    private LocalDate ngay;

    @Column(name = "TIET_BAT_DAU")
    private Integer tietBatDau;

    @Column(name = "SO_TIET")
    private Integer soTiet;

    @Column(name = "PHONG_HOC")
    private String phongHoc;
}