package com.scat.controller;

import com.scat.dto.UserDTO;
import com.scat.model.request.UserDetailsRequestModel;
import com.scat.model.response.UserRest;
import com.scat.service.StorageService;
import com.scat.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final StorageService storageService;

    @Autowired
    public UserController(UserService userService, StorageService storageService) {
        this.userService = userService;
        this.storageService = storageService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDetailsRequestModel userDetails) {
        UserDTO userDto = new UserDTO();
        userDto.setUsername(userDetails.getUsername());
        userDto.setEmail(userDetails.getEmail());
        userDto.setPassword(userDetails.getPassword());
        userDto.setFullName(userDetails.getFullName());
        userDto.setPhoneNumber(userDetails.getPhoneNumber());
        userDto.setDob(userDetails.getDob());
        UserDTO createdUser = userService.createUser(userDto);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        try {
            UserDTO updatedUser = userService.updateUser(userDTO);
            return ResponseEntity.ok().body(updatedUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user information");
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email) {
        UserDTO userDto = userService.getUser(email);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserRest>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        List<UserRest> userRestList = users.stream()
                .map(userDTO -> {
                    UserRest userRest = new UserRest();
                    BeanUtils.copyProperties(userDTO, userRest);
                    return userRest;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(userRestList);
    }
    
    
    @PostMapping(value = "/uploadProfilePicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("username") String username,
                                                  @RequestParam("file") MultipartFile file) {
        try {
            // Define the base directory and user-specific directory
            String baseDirectory = "C:/Users/SCAT-1/scat_17/scat/public/img/profile/";
            String userDirectory = baseDirectory + username;
            
            // Create directories if they do not exist
            File userDir = new File(userDirectory);
            if (!userDir.exists()) {
                userDir.mkdirs(); // Create directories
            }

            // Save the file
            String fileName = file.getOriginalFilename();
            Path targetLocation = Paths.get(userDirectory, fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Build the file download URI
            String fileDownloadUri = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "serveFile", fileName).build().toUri().toString();

            // Update the user's profile picture URL
            UserDTO userDTO = userService.getUserByUsername(username);
            userDTO.setProfilePictureUrl(fileDownloadUri);
            userService.updateUser(userDTO);

            return ResponseEntity.ok().body("Profile picture uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }

    
}
