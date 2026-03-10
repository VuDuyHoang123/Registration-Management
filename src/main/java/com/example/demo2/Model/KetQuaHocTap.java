package com.example.demo2.Model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "KetQuaHocTap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KetQuaHocTap {

    @EmbeddedId
    private KetQuaId id;

    @ManyToOne
    @MapsId("maSV")
    @JoinColumn(name = "MaSV")
    private SinhVien sinhVien;

    @ManyToOne
    @MapsId("maLopHP")
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
