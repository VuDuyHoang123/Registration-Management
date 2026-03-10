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
public class KetQuaId implements Serializable {

    @Column(name = "MaSV", length = 20)
    private String maSV;

    @Column(name = "MaLopHP", length = 20)
    private String maLopHP;
}
