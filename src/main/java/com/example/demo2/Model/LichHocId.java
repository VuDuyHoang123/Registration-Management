package com.example.demo2.Model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LichHocId implements Serializable {

    @Column(name = "MaLopHP", length = 20)
    private String maLopHP;

    @Column(name = "Thu")
    private Integer thu;

    @Column(name = "TietBatDau")
    private Integer tietBatDau;
}
