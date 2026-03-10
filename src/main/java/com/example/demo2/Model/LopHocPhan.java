package com.example.demo2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LopHocPhan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LopHocPhan {

    @Id
    @Column(name = "MaLopHP", length = 20)
    private String maLopHP;

    @Column(name = "TenLop", length = 100)
    private String tenLop;

    @Column(name = "GiangVien", length = 100)
    private String giangVien;

    @Column(name = "SiSoToiDa", nullable = false)
    private Integer siSoToiDa;

    @Column(name = "SiSoDaDK")
    private Integer siSoDaDK = 0;

    @ManyToOne
    @JoinColumn(name = "MaMon")
    private MonHoc monHoc;

    @ManyToOne
    @JoinColumn(name = "MaKhoa")
    private Khoa khoa;
}
