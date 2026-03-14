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
@Table(name = "MonHoc")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonHoc {

    @Id
    @Column(name = "MaMon", length = 20)
    private String maMon;

    @Column(name = "TenMon", length = 100, nullable = false)
    private String tenMon;

    @Column(name = "SoTinChi", nullable = false)
    private Integer soTinChi;

 
}
