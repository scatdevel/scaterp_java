package com.scat.controller;


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
    public String forgotPassword(@RequestParam(value = "email", required = true) String email) {
        if (email == null || email.isEmpty()) {
            return "Email parameter is required.";
        }
        try {
            userService.initiatePasswordReset(email);
            return "Password reset link has been sent to your email if the email address exists in our system.";
        } catch (Exception e) {
            return "An error occurred while processing your request.";
        }
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam(value = "token", required = true) String token, 
                                @RequestParam(value = "newPassword", required = true) String newPassword) {
        if (token == null || token.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            return "Token and newPassword parameters are required.";
        }
        try {
            boolean success = userService.resetPassword(token, newPassword);
            return success ? "Password reset successful" : "Invalid or expired token";
        } catch (Exception e) {
            return "An error occurred while processing your request.";
        }
    }
}


