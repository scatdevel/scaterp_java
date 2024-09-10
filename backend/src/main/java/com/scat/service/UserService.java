package com.scat.service;

import com.scat.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByUsername(String username);
    UserDTO updateUser(UserDTO userDTO);
    List<UserDTO> getAllUsers();
    UserDTO getUser(String email);
    UserDTO updateProfilePicture(String emailOrUsername, String profilePictureUrl);
   
}
