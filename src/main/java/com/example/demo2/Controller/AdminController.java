package com.example.demo2.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo2.Model.Role;
import com.example.demo2.Model.SinhVien;
import com.example.demo2.Model.User;
import com.example.demo2.Repository.SinhVienRepository;
import com.example.demo2.Repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final SinhVienRepository sinhVienRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(SinhVienRepository sinhVienRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.sinhVienRepository = sinhVienRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/add-student")
    public ResponseEntity<?> addStudent(@RequestBody Map<String, String> body) {
        String maSV = body.get("maSV");
        String hoTen = body.get("hoTen");
        String lop = body.get("lopSinhHoat");
        String maKhoa = body.get("maKhoa");
        String soTaiKhoan = body.get("soTaiKhoan");

        if (maSV == null || hoTen == null) return ResponseEntity.badRequest().body("Missing maSV or hoTen");

        if (sinhVienRepository.existsById(maSV)) {
            return ResponseEntity.badRequest().body("Sinh viên đã tồn tại");
        }

        // create user with username=maSV and password=maSV (encoded)
        User user = new User();
        user.setUsername(maSV);
        user.setPassword(passwordEncoder.encode(maSV));
        user.setRole(Role.STUDENT);
        user.setEnabled(Boolean.TRUE);
        user.setFirstLogin(Boolean.TRUE);
        userRepository.save(user);

        // create sinh vien and link user
        SinhVien sv = new SinhVien();
        sv.setMaSV(maSV);
        sv.setHoTen(hoTen);
        sv.setLopSinhHoat(lop);
        sv.setSoTaiKhoan(soTaiKhoan);
        sv.setUser(user);
        // maKhoa linking is omitted; requires Khoa repo - optional
        sinhVienRepository.save(sv);

        return ResponseEntity.ok(Map.of("ok", true));
    }
}
