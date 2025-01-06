package com.scat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scat.entity.Wallet;
import com.scat.service.impl.WalletServiceImpl;

@RestController
@RequestMapping("/users/wallet")
public class WalletController {

	@Autowired
	private WalletServiceImpl walletService;
	

	@GetMapping("/balance/{userId}")
	public Double getWallet(@PathVariable Long userId) {
		return walletService.getBalanceByUserId(userId);

	}

	@PostMapping("/createwallet/{userId}")
	public Wallet createWallet(@PathVariable Long userId) {
		
		return walletService.createWallet(userId);
	}
	
	@GetMapping("/all")
	public List<Wallet> getAllWallet() {
		return walletService.getAllWallet();
	}
	 

    @GetMapping("/balance")
    public ResponseEntity<Double> getBalance(@RequestHeader("Authorization") String token) {
        try {
            // Call the service to get the balance
            double balance = walletService.getBalance(token);
            return ResponseEntity.ok(balance);  // Return the balance as a raw double
        } catch (Exception e) {
            return ResponseEntity.status(401).body(null);  // Unauthorized if token is invalid
        }
    }

    // Endpoint to fetch the price of a crop by ID
    @GetMapping("/crop/price/{cropId}")
    public ResponseEntity<Double> getCropPrice(@PathVariable Long cropId) {
        try {
            double price = walletService.getCropPrice(cropId);
            return ResponseEntity.ok(price);
        } catch (IllegalArgumentException e) {
            // Return a 404 Not Found if the crop is not found
            return ResponseEntity.notFound().build();
        }
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
