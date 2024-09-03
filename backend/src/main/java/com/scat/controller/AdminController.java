package com.scat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.scat.shared.JwtUtil;

@RestController
public class AdminController {

    @Autowired
    private JwtUtil jwtUtil;

    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    private static final String USERNAME = "shiyam98as@gmail.com";
    private static final String HASHED_PASSWORD = PASSWORD_ENCODER.encode("shiyamshiyam");

    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody LoginRequest loginRequest) {
        if (USERNAME.equals(loginRequest.getUsername()) &&
            PASSWORD_ENCODER.matches(loginRequest.getPassword(), HASHED_PASSWORD)) {
            return jwtUtil.generateToken(loginRequest.getUsername());
        } else {
            return "Invalid username or password!";
        }
    }
    @GetMapping("/admin-dashboard")
    public String adminDashboard(@RequestHeader("Authorization") String token) {
        if (jwtUtil.validateToken(token, USERNAME)) {
            return "Welcome to the Dashboard";
        } else {
            return "Invalid or expired token!";
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
