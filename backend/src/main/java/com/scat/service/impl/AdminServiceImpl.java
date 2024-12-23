package com.scat.service.impl;

import com.scat.dto.UserDTO;
import com.scat.dto.WalletDTO;
import com.scat.entity.RoleEntity;
import com.scat.entity.UserEntity;
import com.scat.entity.Wallet;
import com.scat.model.request.UserDetailsRequestModel;
import com.scat.repository.RoleRepository;
import com.scat.repository.UserRepository;
import com.scat.repository.WalletRepository;
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
	private final WalletServiceImpl walletService;
	private final WalletRepository walletRepo;
	private final UserServiceImpl userService;

	@Autowired
	public AdminServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper mapper,
			BCryptPasswordEncoder passwordEncoder,WalletServiceImpl walletService, WalletRepository walletRepo, UserServiceImpl userService) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.walletService = walletService;
		this. walletRepo =  walletRepo;
		this.userService = userService;
		
		initializeDefaultRoles();
	}
	
	
	@Override
	public UserDTO createUserByAdmin(UserDetailsRequestModel userDto) {
	    // Step 1: Find role by name
	    Optional<RoleEntity> roleOpt = roleRepository.findByName(userDto.getRoleName());
	    if (!roleOpt.isPresent()) {
	        throw new RuntimeException("Role not found");
	    }

	    RoleEntity role = roleOpt.get();

	    // Step 2: Hash the password before saving it
	    String encodedPassword = passwordEncoder.encode(userDto.getPassword());

	    // Step 3: Create UserEntity
	    UserEntity user = new UserEntity();
	    user.setUsername(userDto.getUsername());
	    user.setEmail(userDto.getEmail());
	    user.setEncryptedPassword(encodedPassword);
	    user.setRole(role);

	    // Step 4: Save the user (this will persist the user in the database)
	    UserEntity savedUser = userRepository.save(user);

	    // Step 5: Create a wallet if the user doesn't have one
	    if (savedUser.getWallet() == null) {
	        walletService.createWallet(savedUser.getId());  // Create the wallet for the user
	    }

	    // Step 6: Map the saved user to UserDTO for the response
	    UserDTO userResponse = new UserDTO();
	    userResponse.setUsername(savedUser.getUsername());
	    userResponse.setEmail(savedUser.getEmail());
	    userResponse.setRole(savedUser.getRole().getName());

	    // Step 7: If the wallet exists, include it in the response DTO
	    if (savedUser.getWallet() != null) {
	        WalletDTO walletDTO = new WalletDTO();
	        walletDTO.setId(savedUser.getWallet().getId());
	        walletDTO.setBalance(savedUser.getWallet().getBalance());
//	        walletDTO.setCurrency(savedUser.getWallet().getCurrency());
	        userResponse.setWallet(walletDTO); // Add wallet info to the response DTO
	    }

	    return userResponse;
	}

	  public double setBalanceByAdmin(Long userId, double balance) {
		    try {
		        // Retrieve the user based on the token
		        UserEntity user = userRepository.findById(userId)
		        		.orElseThrow(()-> new RuntimeException("User Not Found "));
		        
		        // Ensure user exists
		        if (user == null) {
		            throw new RuntimeException("User not found.");
		        }

		        // Find the wallet associated with the user
		        Wallet wallet =  walletRepo.findByUserId(user.getId());

		        // Check if wallet exists
		        if (wallet == null) {
		            // Optionally, create a new wallet if none exists
		            wallet = new Wallet();
		            wallet.setUser(user); // Assuming setUser() is defined to associate the user with the wallet
		        }

		        // Set the balance provided by the admin
		        wallet.setBalance(balance);

		        // Save the wallet back to the repository
		        walletRepo.save(wallet);

		        // Return the updated balance
		        return wallet.getBalance();

		    } catch (Exception e) {
		        // Log the exception for debugging purposes
		        e.printStackTrace();
		        throw new RuntimeException("An error occurred while setting the balance.");
		    }
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

	
<<<<<<< HEAD
=======
	
	
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

>>>>>>> a3c9de4f4a3b3d9c3d27d9c1075c3cdce8639243
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
	public RoleEntity getRoleById(Long id) {
		return roleRepository.findById(id).orElse(null);
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

	private void initializeDefaultRoles() {
		if (!roleRepository.findByName("ADMIN").isPresent()) {
			roleRepository.save(new RoleEntity("ADMIN"));
		}
	}

	@Override
	public String getUserRole(String email) {
		// Fetch the user from the repository
		Optional<UserEntity> user = userRepository.findByEmail(email);

		if (user.isPresent()) {
			// Retrieve the role entity from the user
			RoleEntity roleEntity = user.get().getRole();

			if (roleEntity != null) {
				// Return the role name from the RoleEntity
				return roleEntity.getName(); // assuming getRoleName() returns the role name
			} else {
				throw new RuntimeException("User has no role assigned");
			}
		} else {
			// Handle case when the user is not found
			throw new RuntimeException("User not found with email: " + email);
		}
	}



}
