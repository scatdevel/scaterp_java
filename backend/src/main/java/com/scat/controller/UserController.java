package com.scat.controller;

import com.scat.dto.UserDTO;
import com.scat.entity.UserEntity;
import com.scat.model.request.UserDetailsRequestModel;
import com.scat.model.response.UserRest;
import com.scat.repository.UserRepository;
import com.scat.service.StorageService;
import com.scat.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

	@Value("${file.upload-dir}")
	private String baseDirectory;
	
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
        userDto.setEncryptedPassword(userDetails.getPassword());
        userDto.setFullName(userDetails.getFullName());
        userDto.setPhoneNumber(userDetails.getPhoneNumber());
        userDto.setDob(userDetails.getDob());
        
        // If roleId is provided, set it in UserDTO
        if (userDetails.getRoleId() != null) {
            userDto.setRoleId(userDetails.getRoleId());
        }

        UserDTO createdUser = userService.createUser(userDto);

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }


    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @RequestParam("fullName") String fullName,
                                         @RequestParam("phoneNumber") Long phoneNumber, @RequestParam("email") String email,
                                         @RequestParam("bio") String bio, @RequestParam("dob") Date dob,
                                         @RequestParam(value = "image", required = false) MultipartFile profilePictureUrl) {

        try {

            // Prepare UserDTO
            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            userDTO.setFullName(fullName);
            userDTO.setPhoneNumber(phoneNumber);
            userDTO.setEmail(email);
            userDTO.setBio(bio);
            userDTO.setDob(dob);

            // Preserve the existing password from the repository
           

            // Handle file upload if present
            if (profilePictureUrl != null && !profilePictureUrl.isEmpty()) {
                String originalFilename = profilePictureUrl.getOriginalFilename();
                Path fileNameAndPath = Paths.get(baseDirectory, originalFilename);

                // Save the file
                Files.write(fileNameAndPath, profilePictureUrl.getBytes()); 

                // Set the profile picture URL in userDTO
                userDTO.setProfilePictureUrl(originalFilename); 
                // or fileNameAndPath.toString() if you need the full path
            }            // Update the user
            UserDTO updatedUser = userService.updateUser(userDTO);
            return ResponseEntity.ok().body(updatedUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user information");
        }
    }



	@GetMapping("/image/{username}")
	public ResponseEntity<Resource> getProfileImage(@PathVariable String username) throws IOException {
		UserDTO user = userService.getUserByUsername(username);
		Path imagePath = Paths.get(baseDirectory, user.getProfilePictureUrl());
		org.springframework.core.io.Resource resource = new FileSystemResource(imagePath.toFile());
		String contentType = Files.probeContentType(imagePath);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
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
        return ResponseEntity.ok(userRestList) ;
    }
    
    @PostMapping(value = "/uploadProfilePicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("username") String username,
                                                  @RequestParam("file") MultipartFile file) {
        try {
            String userDirectory = Paths.get(baseDirectory, username).toString();
            File userDir = new File(userDirectory);
            if (!userDir.exists()) {
                userDir.mkdirs();
            }

            String fileName = file.getOriginalFilename();
            Path targetLocation = Paths.get(userDirectory, fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            UserDTO userDTO = userService.getUserByUsername(username);
            // Store the current password so it won't be lost
            String currentPassword = userDTO.getEncryptedPassword();

            userDTO.setProfilePictureUrl(fileName);
            userDTO.setEncryptedPassword(currentPassword); // Restore the original password

            userService.updateUser(userDTO);

            return ResponseEntity.ok().body("Profile picture uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }

    
}
