package com.example.demo2;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class hashdemo {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(encoder.encode("admin123"));
    }
    
}
