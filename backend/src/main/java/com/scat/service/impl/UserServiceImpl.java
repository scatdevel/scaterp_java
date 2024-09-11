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
import com.scat.service.EmailService;
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
    private final EmailService emailService;

    private final RoleRepository roleRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
       
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

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
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
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
    


}