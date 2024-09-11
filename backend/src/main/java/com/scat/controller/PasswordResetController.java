package com.scat.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scat.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/users")
public class PasswordResetController {

    private final UserServiceImpl userService;

    public PasswordResetController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam(value = "email", required = true) String email) {
        if (email == null || email.isEmpty()) {
            return  ResponseEntity.badRequest().body("Email parameter is required.");
        }
        try {
            userService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset link has been sent to your email if the email address exists in our system.") ;
        } catch (Exception e) {
        	e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing your request.");
        }
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam(value = "token") String token,
                                                @RequestParam(value = "newPassword") String newPassword) {
        if (token == null || token.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body("Token and newPassword parameters are required.");
        }
        try {
            boolean success = userService.resetPassword(token, newPassword);
            if (success) {
                return ResponseEntity.ok("Password reset successful");
            } else {
                return ResponseEntity.badRequest().body("Invalid or expired token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occurred while processing your request.");
        }
    }
  
}


