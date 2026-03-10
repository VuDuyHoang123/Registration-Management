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
@Table(name = "Khoa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Khoa {

    @Id
    @Column(name = "MaKhoa", length = 20)
    private String maKhoa;

    @Column(name = "TenKhoa", length = 100, nullable = false)
    private String tenKhoa;

    @ManyToOne
    @JoinColumn(name = "MaCoSo")
    private CoSo coSo;
}
