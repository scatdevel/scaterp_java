package com.scat.controller;

import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scat.model.request.UserLoginRequestModel;
import com.scat.service.AdminService;
import com.scat.shared.JwtUtil;

@RestController
@RequestMapping("/users/outlet")
public class OutletController {
	
	private AdminService adminService;
	private JwtUtil jwt;

	
	public OutletController(AdminService adminService, JwtUtil jwt) {
		this.adminService = adminService;
		this.jwt = jwt;
	}

	@PostMapping("/login")
	public ResponseEntity<String> outletLogin(@RequestBody UserLoginRequestModel req) {
	    try {
	        // Validate admin login
	        boolean isValid = adminService.validateAdmin(req.getEmail(), req.getPassword());
	        
	        // Check if the login is valid and user email does not contain "@admin"
	        if (isValid && !req.getEmail().contains("@admin")) {
	            
	            // Retrieve the user's role (assuming you have a method to get this)
	            String role = adminService.getUserRole(req.getEmail());
	            
	            // Check if the role is 'outlet'
	            if ("outlet".equalsIgnoreCase(role)) {
	                // Generate the JWT token for the outlet role
	                String token = jwt.generateToken(req.getEmail(), Set.of(role));
	                
	                // Return the token and role in the response
	                return ResponseEntity.ok("{\"token\":\"" + token + "\", \"role\":\"" + role + "\"}");
	            } else {
	                // If the user is not valid for outlet, return an unauthorized error
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\"User Not Valid for Outlet\"");
	            }
	        } else {
	            // If username/password are invalid or user is admin, return unauthorized
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("\"Invalid Username or Password\" or \"User Not Valid for Outlet\"");
	        }
	    } catch (Exception e) {
	        // Return internal server error if any exception occurs
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("\"An Error Occurred During Login\"");
	    }
	}


}

