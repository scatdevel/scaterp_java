package com.scat.service;

import com.scat.dto.UserDTO;
import com.scat.entity.UserEntity;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByUsername(String username);
    UserDTO updateUser(UserDTO userDTO);
    List<UserDTO> getAllUsers();
    UserDTO getUser(String email);
    UserDTO updateProfilePicture(String emailOrUsername, String profilePictureUrl);
    void initiatePasswordReset(String email);
    boolean resetPassword(String token, String newPassword);
	void deleteUserByUsername(String username);
//	Optional<UserEntity> getCurrentUser(String email);
//	Optional<UserEntity> findById(Long id);
	Optional<UserEntity> getUserById(Long id);
}
