package com.scat.controller;

import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;
import com.scat.repository.UserRepository;
import com.scat.service.AdminService;
import com.scat.shared.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/users/admin")
public class AdminController {

    private final AdminService adminService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public AdminController(AdminService adminService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.adminService = adminService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isValid = adminService.validateAdmin(loginRequest.getEmail(), loginRequest.getPassword());
            if (isValid) {
                String token = jwtUtil.generateToken(loginRequest.getEmail(), Set.of("ADMIN"));
                return ResponseEntity.ok("{\"token\":\"" + token + "\", \"role\":\"ADMIN\"}");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid username or password\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"An error occurred during login: " + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createAdmin(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String username,
            @RequestBody List<String> roleNames) {
        try {
            adminService.createAdmin(email, password, username, roleNames);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"Admin created successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Failed to create admin: " + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<?> getAllRoles() {
        try {
            List<RoleEntity> roles = adminService.getAllRoles();
            if (roles.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{\"message\":\"No roles found\"}");
            }
            return ResponseEntity.ok(roles); // Automatically converts to JSON
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"Failed to fetch roles\"}");
        }
    }



     @GetMapping("/user/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        try {
            UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/fetch/all")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        try {
            List<UserEntity> users = userRepository.findAll();
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
            }
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/{email}")
    public ResponseEntity<UserEntity> getAdminByEmail(@PathVariable String email) {
        try {
            UserEntity adminUser = adminService.getAdminByEmail(email);
            if (adminUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(adminUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    
    @PostMapping("/roles/create")
    public ResponseEntity<String> createRole(@RequestBody Map<String, String> body) {
        String roleName = body.get("roleName");
        if (roleName == null || roleName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Role name is required\"}");
        }
        try {
            RoleEntity role = adminService.createRole(roleName);
            return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"Role created successfully\", \"roleId\":\"" + role.getId() + "\"}");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Failed to create role: " + e.getMessage() + "\"}");
        }
    }


    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRoleToUser(@RequestParam String email, @RequestParam String roleName) {
        System.out.println("Received email: " + email + " and roleName: " + roleName);
        try {
            if (email == null || email.isEmpty()) {
                throw new IllegalArgumentException("Email cannot be null or empty");
            }
            if (roleName == null || roleName.isEmpty()) {
                throw new IllegalArgumentException("Role name cannot be null or empty");
            }
            adminService.assignRoleToUser(email, roleName);
            return ResponseEntity.ok("{\"message\":\"Role assigned successfully\"}");
        } catch (Exception e) {
            System.err.println("Error assigning role: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Failed to assign role: " + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/roles/{roleName}")
    public ResponseEntity<RoleEntity> getRole(@PathVariable String roleName) {
        try {
            RoleEntity role = adminService.getRoleByName(roleName);
            if (role == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(role);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/edit-role")
    public ResponseEntity<String> editRole(@RequestParam String email, @RequestParam String oldRoleName, @RequestParam String newRoleName) {
        try {
            adminService.editRole(email, oldRoleName, newRoleName);
            return ResponseEntity.ok("{\"message\":\"Role updated successfully\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Failed to update role: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Unexpected error occurred: " + e.getMessage() + "\"}");
        }
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/roles/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable Long roleId) {
        try {
            adminService.deleteRole(roleId);
            return ResponseEntity.ok("{\"message\":\"Role deleted successfully\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Failed to delete role: " + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"Unexpected error occurred: " + e.getMessage() + "\"}");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/roles/{roleId}")
    public ResponseEntity<String> updateRole(@PathVariable Long roleId, @RequestParam String newRoleName) {
        try {
            adminService.updateRole(roleId, newRoleName);
            return ResponseEntity.ok("{\"message\":\"Role updated successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Failed to update role: " + e.getMessage() + "\"}");
        }
    }



    public static class LoginRequest {
        private String email;
        private String password;

 
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
    

}
