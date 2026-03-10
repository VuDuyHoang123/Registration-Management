package com.example.demo2.Model;

import java.math.BigDecimal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SinhVien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SinhVien {

    @Id
    @Column(name = "MaSV", length = 20)
    private String maSV;

    @Column(name = "HoTen", length = 100, nullable = false)
    private String hoTen;

    @Column(name = "LopSinhHoat", length = 50)
    private String lopSinhHoat;

    @ManyToOne
    @JoinColumn(name = "MaKhoa")
    private Khoa khoa;

    @Column(name = "TongNoHocPhi", precision = 15, scale = 2)
    private BigDecimal tongNoHocPhi = BigDecimal.ZERO;

    @Column(name = "TrangThaiDong")
    private Boolean trangThaiDong = Boolean.FALSE;

    @Column(name = "SoTaiKhoan", length = 50)
    private String soTaiKhoan;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
