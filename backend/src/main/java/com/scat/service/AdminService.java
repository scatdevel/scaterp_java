package com.scat.service;

import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;

import java.util.List;

public interface AdminService {

    boolean validateAdmin(String email, String password);

    void createAdmin(String email, String password, String username, List<String> roleNames); // No changes here

    UserEntity getAdminByEmail(String email);

    RoleEntity createRole(String roleName);

    RoleEntity getRoleByName(String roleName);

    List<RoleEntity> getAllRoles();

    void assignRoleToUser(String email, String roleName);

    void updateRole(Long roleId, String newRoleName);

    void deleteRole(Long roleId);
    
    void editRole(String email, String oldRoleName, String newRoleName);
    
    void deleteRoleFromUser(String email);
}

