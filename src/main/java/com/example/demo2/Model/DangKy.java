package com.example.demo2.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "DangKy", uniqueConstraints = @UniqueConstraint(columnNames = {"MaSV", "MaLopHP"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DangKy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDK")
    private Long maDK;

    @Column(name = "NgayDK")
    private LocalDateTime ngayDK = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "MaSV")
    private SinhVien sinhVien;

    @ManyToOne
    @JoinColumn(name = "MaLopHP")
    private LopHocPhan lopHocPhan;
}
