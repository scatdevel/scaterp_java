package com.scat.controller;

import com.scat.dto.UserDTO;
import com.scat.entity.UserEntity;
import com.scat.model.request.UserDetailsRequestModel;
import com.scat.model.response.UserRest;
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
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

	@Value("${file.upload-dir}")
	private String baseDirectory;

	
	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

//	@PostMapping("/register")
//	public ResponseEntity<UserDTO> createUser(@RequestBody UserDetailsRequestModel userDetails) {
//		UserDTO userDto = new UserDTO();
//		userDto.setUsername(userDetails.getUsername());
//		userDto.setEmail(userDetails.getEmail());
//		userDto.setEncryptedPassword(userDetails.getPassword());
//		userDto.setFullName(userDetails.getFullName());
//		userDto.setPhoneNumber(userDetails.getPhoneNumber());
//		userDto.setDob(userDetails.getDob());
//		userDto.setAadharCardNumber(userDetails.getAadharCardNumber());
//		   userDto.setAadharImage_1(userDetails.getAadharImageUrl_1());
//		    userDto.setAadharImage_2(userDetails.getAadharImageUrl_2());
//		
//
//		// If roleId is provided, set it in UserDTO
//		if (userDetails.getRoleId() != null) {
//			userDto.setRoleId(userDetails.getRoleId());
//		}
//		
//		
//		UserDTO createdUser = userService.createUser(userDto);
//
//		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
//	}
	
	@PostMapping("/register")
	public ResponseEntity<UserDTO> createUser(
	    @RequestParam("username") String username,
	    @RequestParam("email") String email,
	    @RequestParam("password") String password,
//	    @RequestParam("fullName") String fullName,
	    @RequestParam("phoneNumber") Long phoneNumber,
//	    @RequestParam("dob") Date dob,
	    @RequestParam("aadharCardNumber") Long aadharCardNumber,
	    @RequestParam("roleId") Long roleId,
	    @RequestParam("aadharImageUrl_1") MultipartFile aadharImageUrl_1,
	    @RequestParam("aadharImageUrl_2") MultipartFile aadharImageUrl_2) {

	    // Create a new UserDTO and map data from the request parameters
	    UserDTO userDto = new UserDTO();
	    userDto.setUsername(username);
	    userDto.setEmail(email);
	    userDto.setEncryptedPassword(password);  // Encrypt password before saving
//	    userDto.setFullName(fullName);
	    userDto.setPhoneNumber(phoneNumber);
//	    userDto.setDob(dob);
	    userDto.setAadharCardNumber(aadharCardNumber);

	    // Handle image files (you can upload to a server or cloud storage, here we use placeholders)
	    try {
	        String imageUrl1 = saveImage(aadharImageUrl_1);  // Implement your own image saving logic
	        String imageUrl2 = saveImage(aadharImageUrl_2);  // Implement your own image saving logic

	        userDto.setAadharImageUrl_1(imageUrl1);
	        userDto.setAadharImageUrl_2(imageUrl2);
	    } catch (IOException e) {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Handle file upload errors
	    }

	    // If roleId is provided, set it in UserDTO
	    userDto.setRoleId(roleId);

	    // Call the service layer to create the user
	    UserDTO createdUser = userService.createUser(userDto);

	    // Return the created user in the response with HTTP 201 status
	    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	// Utility method to save the image (you can modify this to upload to cloud storage)
	private String saveImage(MultipartFile image) throws IOException {
	    // Example saving to a local folder
	    String uploadDir = "uploads/"; // Define your upload directory
	    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
	    Path path = Paths.get(uploadDir + fileName);
	    Files.createDirectories(path.getParent());  // Ensure the directory exists
	    Files.write(path, image.getBytes());  // Save the file
	    return  fileName; // Return the image URL (you can adjust this based on your server config)
	}

	
	
	@PutMapping("/{username}")
	public ResponseEntity<?> updateUser(@PathVariable String username, @RequestParam("fullName") String fullName,
			@RequestParam("phoneNumber") Long phoneNumber, @RequestParam("email") String email,
			@RequestParam("bio") String bio, @RequestParam("dob") Date dob,
			@RequestParam(value = "houseNumber") String houseNumber, @RequestParam(value = "street") String street,
			@RequestParam(value = "landmark") String landmark, @RequestParam(value = "locality") String locality,
			@RequestParam(value = "city") String city, @RequestParam(value = "state") String state,
			@RequestParam(value = "pincode") Long pincode, @RequestParam(value = "country") String country,
			@RequestParam(value = "image", required = false) MultipartFile profilePictureUrl) 

			{

		try {
			// Prepare UserDTO
			UserDTO userDTO = new UserDTO();
			userDTO.setUsername(username);
			userDTO.setFullName(fullName);
			userDTO.setPhoneNumber(phoneNumber);
			userDTO.setEmail(email);
			userDTO.setBio(bio);
			userDTO.setDob(dob);
			userDTO.setHouseNumber(houseNumber);
			userDTO.setStreet(street);
			userDTO.setLandmark(landmark);
			userDTO.setLocality(locality);
			userDTO.setCity(city);
			userDTO.setState(state);
			userDTO.setPincode(pincode);
			userDTO.setCountry(country);
			
			
            // Handle file upload if present
            if (profilePictureUrl != null && !profilePictureUrl.isEmpty()) {
                String originalFilename = profilePictureUrl.getOriginalFilename();
                Path fileNameAndPath = Paths.get(baseDirectory, originalFilename);

                // Save the file
                Files.write(fileNameAndPath, profilePictureUrl.getBytes()); 

				// Set the profile picture URL in userDTO
				userDTO.setProfilePictureUrl(originalFilename); // or fileNameAndPath.toString() if you need the full
																// path
			}

			// Update the user
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

	    if (user == null || user.getProfilePictureUrl() == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }

	    Path imagePath = Paths.get(baseDirectory, user.getProfilePictureUrl());  // Ensure correct file path
	    if (Files.exists(imagePath)) {
	        org.springframework.core.io.Resource resource = new FileSystemResource(imagePath.toFile());
	        String contentType = Files.probeContentType(imagePath);
	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(contentType))
	                .body(resource);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}

	@GetMapping("/find-by-email/{email}")
	public ResponseEntity<UserEntity> getUser(@PathVariable String email) {
		UserEntity userDto = userService.getUser(email);
		if (userDto != null) {
			return ResponseEntity.ok(userDto);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
 
	@GetMapping("/get/{id}")
	public ResponseEntity<UserEntity> getUserById(@PathVariable Long id){
		Optional<UserEntity> user = userService.getUserById(id);
		
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
	}

	@GetMapping("/all")
	public ResponseEntity<List<UserRest>> getAllUsers() {
	    List<UserDTO> users = userService.getAllUsers();
	    
	    // Filter users to include only those with the role 'farmer', avoiding null roles
	    List<UserDTO> filteredUsers = users.stream()
	            .filter(userDTO -> userDTO.getRole() != null && userDTO.getRole().contains("FARMER"))
	            .collect(Collectors.toList());

	    // Map filtered users to UserRest objects
	    List<UserRest> userRestList = filteredUsers.stream().map(userDTO -> {
	        UserRest userRest = new UserRest();
	        BeanUtils.copyProperties(userDTO, userRest);
	        return userRest;
	    }).collect(Collectors.toList());
	    
	    return ResponseEntity.ok(userRestList);
	}

	
	@PostMapping(value = "/uploadProfilePicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadProfilePicture(@RequestParam("username") String username,
			@RequestParam("file") MultipartFile file) {
		try {
			// Create user directory if it doesn't exist
			String userDirectory = Paths.get(baseDirectory, username).toString();
			File userDir = new File(userDirectory);
			if (!userDir.exists()) {
				userDir.mkdirs();
			}

			// Save the file to the user directory
			String fileName = file.getOriginalFilename();
			Path targetLocation = Paths.get(userDirectory, fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			// Retrieve the current user entity
			UserDTO userDTO = userService.getUserByUsername(username);

			// Update only the profile picture URL
			userDTO.setProfilePictureUrl(fileName);

			// Update the user in the database without changing the password
			userService.updateProfilePicture(userDTO.getUsername(), userDTO.getProfilePictureUrl());

			return ResponseEntity.ok().body("Profile picture uploaded successfully");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
		}
	}

	@GetMapping("/profile")
	public ResponseEntity<UserEntity> findUserByJwtToken(@RequestHeader("Authorization") String jwtToken) {
	    // Call a service method that handles the logic to find the user by JWT
	    UserEntity user = userService.getUserByJwtToken(jwtToken);
	    
	    if (user != null) {
	        return ResponseEntity.ok(user);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	}
	
}
