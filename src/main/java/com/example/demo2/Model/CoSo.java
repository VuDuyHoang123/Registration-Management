package com.example.demo2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CoSo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoSo {

    @Id
    @Column(name = "MaCoSo", length = 20)
    private String maCoSo;

    @Column(name = "TenCoSo", length = 100, nullable = false)
    private String tenCoSo;

    @Column(name = "DiaChi")
    private String diaChi;
}
