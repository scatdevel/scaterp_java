package com.scat.service;

import com.scat.dto.UserDTO;
import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;
import com.scat.model.request.UserDetailsRequestModel;

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

	String getUserRole(String email);

<<<<<<< HEAD
	UserDTO createUserByAdmin(UserDetailsRequestModel userDto);

	RoleEntity getRoleById(Long id);
=======
	UserEntity createUserByAdmin(UserDetailsRequestModel userDto);

>>>>>>> a3c9de4f4a3b3d9c3d27d9c1075c3cdce8639243
}
