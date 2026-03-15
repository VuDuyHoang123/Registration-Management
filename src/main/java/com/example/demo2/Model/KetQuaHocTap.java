package com.example.demo2.Model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "KetQuaHocTap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaHocTap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaKQ")
    private Long maKQ;

    @ManyToOne
    @JoinColumn(name = "MaSV")
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "MaLopHP")
    private LopHocPhan lopHocPhan;

    @Column(name = "DiemCC", precision = 4, scale = 2)
    private BigDecimal diemCC;

    @Column(name = "DiemGiuaKy", precision = 4, scale = 2)
    private BigDecimal diemGiuaKy;

    @Column(name = "DiemCuoiKy", precision = 4, scale = 2)
    private BigDecimal diemCuoiKy;

    @Column(name = "DiemTongKet", precision = 4, scale = 2)
    private BigDecimal diemTongKet;
}