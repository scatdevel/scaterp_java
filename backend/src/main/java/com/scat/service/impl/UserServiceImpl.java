package com.scat.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.scat.dto.UserDTO;
import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;
import com.scat.repository.RoleRepository;
import com.scat.repository.UserRepository;
import com.scat.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final RoleRepository roleRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.modelMapper = modelMapper;

		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public UserDTO createUser(UserDTO userDTO) {
		if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
			throw new RuntimeException("Email already in use");
		}

		UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
		userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getEncryptedPassword()));

		if (userDTO.getRole() != null) {
			RoleEntity role = roleRepository.findByName(userDTO.getRole().getName())
					.orElseThrow(() -> new RuntimeException("Role not found: " + userDTO.getRole().getName()));
			userEntity.setRole(role);
		}

		UserEntity storedUserDetails = userRepository.save(userEntity);
		return modelMapper.map(storedUserDetails, UserDTO.class);
	}

	@Override
	public UserDTO getUser(String emailOrUsername) {
		UserEntity userEntity = userRepository.findByUsername(emailOrUsername);
		if (userEntity == null) {
			userEntity = userRepository.findByUsername(emailOrUsername);
		}
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with identifier: " + emailOrUsername);
		}

		return modelMapper.map(userEntity, UserDTO.class);
	}

		@Override
	public UserDTO getUserByUsername(String username) {
		UserEntity userEntity = userRepository.findByUsername(username);
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

		return modelMapper.map(userEntity, UserDTO.class);
	}

	@Override
	public UserDTO updateUser(UserDTO userDTO) {
		UserEntity userEntity = userRepository.findByUsername(userDTO.getUsername());
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with username: " + userDTO.getUsername());
		}

		userEntity.setFullName(userDTO.getFullName());
		userEntity.setPhoneNumber(userDTO.getPhoneNumber());
		userEntity.setEmail(userDTO.getEmail());
		userEntity.setBio(userDTO.getBio());
		userEntity.setDob(userDTO.getDob());
		if (userDTO.getEncryptedPassword() != null && !userDTO.getEncryptedPassword().isEmpty()) {
			userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getEncryptedPassword()));
		}
		userEntity.setProfilePictureUrl(userDTO.getProfilePictureUrl());

		if (userDTO.getRole() != null) {
			RoleEntity role = roleRepository.findByName(userDTO.getRole().getName())
					.orElseThrow(() -> new RuntimeException("Role not found: " + userDTO.getRole().getName()));
			userEntity.setRole(role);
		}

		UserEntity updatedUserEntity = userRepository.save(userEntity);
		return modelMapper.map(updatedUserEntity, UserDTO.class);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<UserEntity> users = userRepository.findAll();
		List<UserDTO> userDTOs = new ArrayList<>();

		for (UserEntity userEntity : users) {
			UserDTO userDTO = modelMapper.map(userEntity, UserDTO.class);
			userDTOs.add(userDTO);
		}

		return userDTOs;
	}

	@Override
	public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByUsername(emailOrUsername);
		if (userEntity == null) {
			userEntity = userRepository.findByEmail(emailOrUsername).orElse(null);
		}
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with identifier: " + emailOrUsername);
		}

		// Convert roles to GrantedAuthority
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		if (userEntity.getRole() != null) {
			authorities.add(new SimpleGrantedAuthority(userEntity.getRole().getName()));
		}

		// Return a UserDetails object with roles
		return new User(userEntity.getUsername(), userEntity.getEncryptedPassword(), authorities);
	}

	@Override
	public UserDTO updateProfilePicture(String emailOrUsername, String profilePictureUrl) {
		UserEntity userEntity = userRepository.findByUsername(emailOrUsername);
		if (userEntity == null) {
			userEntity = userRepository.findByUsername(emailOrUsername);
		}
		if (userEntity == null) {
			throw new UsernameNotFoundException("User not found with identifier: " + emailOrUsername);
		}

		userEntity.setProfilePictureUrl(profilePictureUrl);
		UserEntity updatedUserEntity = userRepository.save(userEntity);
		return modelMapper.map(updatedUserEntity, UserDTO.class);
	}

	public void initiatePasswordReset(String email) {
		Optional<UserEntity> userOpt = userRepository.findByEmail(email);
		if (userOpt.isPresent()) {
			UserEntity user = userOpt.get();
			String token = UUID.randomUUID().toString();
			user.setResetToken(token);
			user.setResetTokenExpiration(System.currentTimeMillis() + 3600000); // 1 hour validity
			userRepository.save(user); // Save the updated user entity
		} else {
			throw new IllegalArgumentException("Email not found in the database");
		}
	}

//  String resetLink = "http://localhost:8080/users/reset-password?token=" + token;
//  emailService.sendEmail(user.getEmail(), "Password Reset", "Click the link to reset your password: " + resetLink);

	public boolean resetPassword(String token, String newPassword) {
		Optional<UserEntity> userOpt = userRepository.findByResetToken(token);
		if (userOpt.isPresent()) {
			UserEntity user = userOpt.get();
			if (user.getResetTokenExpiration() > System.currentTimeMillis()) {
				user.setEncryptedPassword(bCryptPasswordEncoder.encode(newPassword));
				user.setResetToken(null);
				user.setResetTokenExpiration(null);
				userRepository.save(user);
				return true;
			}
		}
		return false;
	}



}