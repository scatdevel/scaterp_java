package com.scat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.scat.entity.Crop;
import com.scat.entity.UserEntity;
import com.scat.entity.Wallet;
import com.scat.repository.CropRepository;
import com.scat.repository.UserRepository;
import com.scat.repository.WalletRepository;

@Service
public class WalletServiceImpl {

	@Autowired
	private WalletRepository walletRepository;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	CropRepository cropRepo;

	@Autowired
	@Lazy
	private UserServiceImpl userService;

	public Wallet createWallet(Long userId) {

		UserEntity user = userRepo.findById(userId)
				.orElseThrow(() -> new RuntimeException("User Not Found with :" + userId));

		if (user.getWallet() != null) {
			throw new RuntimeException("Wallet Already Exists !");

		}
//		if(user.getRole()!=null && user.getRole().getName().equalsIgnoreCase("ADMIN")) {
//			throw new RuntimeException("Wallet is Not Applicable for this user");
//		}

		Wallet wallet = new Wallet();
//		wallet.setBalance(2000);
		wallet.setCurrency("INR");
		wallet.setUser(user);

		return walletRepository.save(wallet);
	}

	public Wallet getWallet(Long userId) {
		return walletRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("No Wallet Found for :" + userId));

	}

	public void deposit(Long userId, double amount) {
		Wallet wallet = getWallet(userId);
		wallet.deposit(amount);
		UserEntity user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));
		wallet.setUser(user);
		walletRepository.save(wallet);
	}

	public boolean withdraw(Long userId, double amount) {
		Wallet wallet = getWallet(userId);
		return wallet.withdraw(amount);
	}

	public double getCropPrice(Long cropId) {
		Crop crop = cropRepo.findById(cropId)
				.orElseThrow(() -> new IllegalArgumentException("Crop not found for ID: " + cropId));
		return crop.getPrice();
	}

	public double getBalance(String token) {
	        // Validate the token and extract user information
	        UserEntity user = userService.getUserByJwtToken(token);
	        if (user == null) {
	            throw new RuntimeException("Invalid or expired token.");
	        }

	        // Retrieve user ID from the validated token
	        Long userId = user.getId();

	        // Fetch the wallet by user ID (Wallet repository method will use user ID)
	        Wallet wallet = walletRepository.findByUserId(userId);
	        if (wallet == null) {
	            throw new RuntimeException("Wallet not found for the user.");
	        }

	        // Return the balance of the wallet associated with the user
	        return wallet.getBalance();
	    }
	
}
