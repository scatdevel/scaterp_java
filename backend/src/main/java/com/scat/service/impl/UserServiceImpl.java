package com.scat.service.impl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.scat.dto.UserDTO;
import com.scat.entity.UserEntity;
import com.scat.repository.UserRepository;
import com.scat.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }

        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        UserEntity storedUserDetails = userRepository.save(userEntity);

        return modelMapper.map(storedUserDetails, UserDTO.class);
    }

    @Override
    public UserDTO getUser(String emailOrUsername) {
        UserEntity userEntity = userRepository.findByEmail(emailOrUsername);
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
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        }
        userEntity.setProfilePictureUrl(userDTO.getProfilePictureUrl());

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
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), new ArrayList<>());
    }

    @Override
    public UserDTO updateProfilePicture(String emailOrUsername, String profilePictureUrl) {
        UserEntity userEntity = userRepository.findByEmail(emailOrUsername);
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
}
