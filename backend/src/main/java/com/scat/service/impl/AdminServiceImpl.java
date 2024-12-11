package com.scat.service.impl;

import com.scat.dto.UserDTO;
import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;
import com.scat.model.request.UserDetailsRequestModel;
import com.scat.repository.RoleRepository;
import com.scat.repository.UserRepository;
import com.scat.service.AdminService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	private final ModelMapper mapper;

	@Autowired
	public AdminServiceImpl(UserRepository userRepository, ModelMapper mapper, RoleRepository roleRepository,
			BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.mapper = mapper;
		initializeDefaultRoles();
	}

	@Override
	public boolean validateAdmin(String email, String password) {
		UserEntity adminUser = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Admin user not found"));
		return passwordEncoder.matches(password, adminUser.getEncryptedPassword());
	}

	// A method to get roles of an admin (if needed)
	public List<RoleEntity> getRolesForAdmin(String email) {
		UserEntity user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Admin user not found"));

		if (user.getRole() == null) {
			throw new RuntimeException("Admin user has no assigned roles");
		}
		return List.of(user.getRole());
	}

	@Override
	public void createAdmin(String email, String password, String username, List<String> roleNames) {
		if (userRepository.findByEmail(email).isPresent()) {
			throw new RuntimeException("Admin with this email already exists");
		}

		String encodedPassword = passwordEncoder.encode(password);
		UserEntity adminUser = new UserEntity(email, encodedPassword, username);

		for (String roleName : roleNames) {
			RoleEntity role = roleRepository.findByName(roleName)
					.orElseThrow(() -> new RuntimeException("Role " + roleName + " not found"));
			adminUser.setRole(role);
		}

		userRepository.save(adminUser);
	}

	@Override
	public UserEntity createUserByAdmin(UserDetailsRequestModel userDto) {

		Optional<RoleEntity> roleopt = roleRepository.findByName(userDto.getRoleName());

		if (!roleopt.isEmpty()) {
			throw new RuntimeException("Role Not Found For :" + roleopt);
		}

		RoleEntity role = roleopt.get();

		String encryptedpassword = passwordEncoder.encode(userDto.getPassword());

		UserEntity user = new UserEntity();
		user.setEmail(userDto.getEmail());
		user.setUsername(userDto.getUsername());
		user.setEncryptedPassword(encryptedpassword);
		user.setRole(role);

		return userRepository.save(user);
	}

	@Override
	public UserEntity getAdminByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	@Override
	public RoleEntity createRole(String roleName) {
		if (roleRepository.findByName(roleName).isPresent()) {
			throw new RuntimeException("Role already exists");
		}
		RoleEntity role = new RoleEntity(roleName);
		return roleRepository.save(role);
	}

	@Override
	public RoleEntity getRoleByName(String roleName) {
		return roleRepository.findByName(roleName).orElse(null);
	}

	@Override
	public List<RoleEntity> getAllRoles() {
		return roleRepository.findAll();
	}

	@Override
	public void updateRole(Long roleId, String newRoleName) {
		RoleEntity role = roleRepository.findById(roleId)
				.orElseThrow(() -> new RuntimeException("Role not found with id: " + roleId));

		if (roleRepository.findByName(newRoleName).isPresent()) {
			throw new RuntimeException("Role with the new name already exists");
		}

		role.setName(newRoleName);
		roleRepository.save(role);
	}

	@Override
	public void editRole(String email, String oldRoleName, String newRoleName) {
		UserEntity userEntity = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found with email: " + email));

		RoleEntity oldRole = roleRepository.findByName(oldRoleName)
				.orElseThrow(() -> new RuntimeException("Old Role not found: " + oldRoleName));
		RoleEntity newRole = roleRepository.findByName(newRoleName)
				.orElseThrow(() -> new RuntimeException("New Role not found: " + newRoleName));

		if (userEntity.getRole() != null && userEntity.getRole().equals(oldRole)) {
			userEntity.setRole(newRole);
			userRepository.save(userEntity);
		} else {
			throw new RuntimeException("Old role not assigned to the user");
		}
	}

	@Override
	public void deleteRole(Long roleId) {
		RoleEntity role = roleRepository.findById(roleId)
				.orElseThrow(() -> new RuntimeException("Role not found with id: " + roleId));

		List<UserEntity> usersWithRole = userRepository.findByRole_Id(roleId);
		if (!usersWithRole.isEmpty()) {
			throw new RuntimeException("Cannot delete role as users are assigned to it");
		}
		roleRepository.delete(role);
	}

	@Override
	public void assignRoleToUser(String email, String roleName) {
		UserEntity user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found with email: " + email));

		RoleEntity role = roleRepository.findByName(roleName)
				.orElseThrow(() -> new RuntimeException("Role not found with name: " + roleName));

		user.setRole(role);
		userRepository.save(user);
	}

	@Override
	public void deleteRoleFromUser(String email) {
		UserEntity user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found with email: " + email));

		user.setRole(null);
		userRepository.save(user);

	}

	@Override
	public String getUserRole(String email) {
		Optional<UserEntity> user = userRepository.findByEmail(email);

		if (user != null) {
			RoleEntity role = user.get().getRole();
			if (role != null) {
				return role.getName();
			} else {
				throw new RuntimeException("User has No role Assigned");
			}
		} else {
			throw new RuntimeException("User Not Found With This email :" + email);
		}

	}

	private void initializeDefaultRoles() {
		if (!roleRepository.findByName("ADMIN").isPresent()) {
			roleRepository.save(new RoleEntity("ADMIN"));
		}
	}
}
