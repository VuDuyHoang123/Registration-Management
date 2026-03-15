package com.example.demo2.Model;

import jakarta.persistence.*;
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

    @Column(name = "THU")
    private Integer thu;

    @Column(name = "TIET_BAT_DAU")
    private Integer tietBatDau;

    @Column(name = "SO_TIET")
    private Integer soTiet;

    @Column(name = "PHONG_HOC")
    private String phongHoc;
}