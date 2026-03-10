package com.example.demo2.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CO_SO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoSo {

    @Id
    @Column(name = "MA_CO_SO", length = 20)
    private String maCoSo;

    @Column(name = "TEN_CO_SO", length = 100, nullable = false)
    private String tenCoSo;

    @Column(name = "DIA_CHI")
    private String diaChi;
}
