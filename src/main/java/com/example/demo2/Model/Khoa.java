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
@Table(name = "KHOA")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Khoa {

    @Id
    @Column(name = "MAKHOA", length = 20)
    private String maKhoa;

    @Column(name = "TENKHOA", length = 100, nullable = false)
    private String tenKhoa;

    @ManyToOne
    @JoinColumn(name = "MA_CO_SO")   // phải đúng tên cột trong DB
    private CoSo coSo;
}
