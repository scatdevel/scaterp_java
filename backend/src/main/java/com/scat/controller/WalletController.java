package com.scat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scat.entity.Wallet;
import com.scat.repository.UserRepository;
import com.scat.service.impl.WalletServiceImpl;

@RestController
@RequestMapping("/users/wallet")
public class WalletController {

	@Autowired
	private WalletServiceImpl walletService;
	
	@Autowired
	private UserRepository userrepo;

	@GetMapping("/{userId}")
	public Wallet getWallet(@PathVariable Long userId) {
		return walletService.getWallet(userId);

	}

	@PostMapping("/createwallet/{userId}")
	public Wallet createWallet(@PathVariable Long userId) {
		
		return walletService.createWallet(userId);
	}

	@PostMapping("/deposit/{userId}")
	void deposit(@PathVariable Long userId, @RequestBody double amount) {

		walletService.deposit(userId, amount);

	}

	@PostMapping("/withdraw/{userId}")
	public boolean withdraw(@PathVariable Long userId, @RequestBody Double amount) {

		return walletService.withdraw(userId, amount);
	}
}

