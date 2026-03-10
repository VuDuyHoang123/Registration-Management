package com.example.demo2.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo2.Model.User;
import com.example.demo2.Repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username").trim();
        String password = body.get("password").trim();
        if (username == null || password == null) return ResponseEntity.badRequest().body("Missing username or password");

        User user = userRepository.findByUsername(username);
        if (user == null) return ResponseEntity.status(401).body("Invalid credentials");
        String stored = user.getPassword();
       if (stored == null || !passwordEncoder.matches(password, stored))
    return ResponseEntity.status(401).body("Invalid credentials");

        // simple response indicating first login and role
        return ResponseEntity.ok(Map.of(
                "firstLogin", user.getFirstLogin() == null ? Boolean.TRUE : user.getFirstLogin(),
                "role", user.getRole() == null ? "" : user.getRole().name()
        ));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String newPassword = body.get("newPassword");
        if (username == null || newPassword == null) return ResponseEntity.badRequest().body("Missing parameters");

        User user = userRepository.findByUsername(username);
        if (user == null) return ResponseEntity.status(404).body("User not found");

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setFirstLogin(Boolean.FALSE);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("ok", true));
    }






    @GetMapping("/test")
public String test() {
    User u = userRepository.findByUsername("admin");
    if (u == null) return "NOT FOUND";
    return u.getUsername() + " - " + u.getRole();
}





}
