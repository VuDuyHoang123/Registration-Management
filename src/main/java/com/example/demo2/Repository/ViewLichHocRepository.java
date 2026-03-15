package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo2.Model.ViewLichHoc;

public interface ViewLichHocRepository 
        extends JpaRepository<ViewLichHoc, Long> {
}