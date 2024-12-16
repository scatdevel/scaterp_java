package com.scat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scat.entity.UserEntity;
import com.scat.entity.Wallet;
import com.scat.repository.UserRepository;
import com.scat.repository.WalletRepository;

@Service
public class WalletServiceImpl {

	@Autowired
	private WalletRepository walletRepositry;
	
	@Autowired
	private UserRepository userRepo;
	
	public Wallet createWallet(Long userId) {
		
		UserEntity user = userRepo.findById(userId).
				orElseThrow(()-> new RuntimeException("User Not Found with :" +userId));
		
		
		if(user.getWallet() != null) {
			throw new RuntimeException("Wallet Already Exists !");
		}
		
		
		Wallet wallet = new Wallet();
		wallet.setBalance(2000);
		wallet.setUser(user);
		
		return walletRepositry.save(wallet);
	}

	public Wallet getWallet(Long userId) {
		return walletRepositry.findById(userId)
				.orElseThrow(() -> new RuntimeException("No Wallet Found for :" + userId));

	}

	public void deposit(Long userId, double amount) {
		Wallet wallet = getWallet(userId);
		wallet.deposit(amount);
		walletRepositry.save(wallet);
	}

	public boolean withdraw(Long userId, double amount) {
		Wallet wallet = getWallet(userId);
		return wallet.withdraw(amount);
	}
}
