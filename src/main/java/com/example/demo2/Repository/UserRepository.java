package com.example.demo2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo2.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
}