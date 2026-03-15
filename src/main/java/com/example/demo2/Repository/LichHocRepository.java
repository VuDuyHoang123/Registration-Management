package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo2.Model.LichHoc;

public interface LichHocRepository 
        extends JpaRepository<LichHoc, Long> {
}