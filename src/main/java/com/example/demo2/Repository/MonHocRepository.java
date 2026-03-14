package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo2.Model.MonHoc;

public interface MonHocRepository extends JpaRepository<MonHoc, String> {
}