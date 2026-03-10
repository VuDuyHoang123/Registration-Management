package com.example.demo2.Model;

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
@Table(name = "LichHoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichHoc {

    @EmbeddedId
    private LichHocId id;

    @ManyToOne
    @MapsId("maLopHP")
    @JoinColumn(name = "MaLopHP")
    private LopHocPhan lopHocPhan;

    @Column(name = "SoTiet")
    private Integer soTiet;

    @Column(name = "PhongHoc", length = 50)
    private String phongHoc;
}
