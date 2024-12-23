package com.scat.service.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scat.entity.Crop;
import com.scat.entity.Transaction;
import com.scat.entity.UserEntity;
import com.scat.entity.Wallet;
import com.scat.repository.CropRepository;
import com.scat.repository.TransactionRepository;
import com.scat.repository.UserRepository;
import com.scat.repository.WalletRepository;

@Service
public class TransactionServiceImpl {

	@Autowired
	private UserRepository userrepo;

	@Autowired
	private UserServiceImpl userservice;

	@Autowired
	private CropRepository croprepo;

	@Autowired
	private WalletRepository walletrepo;

	@Autowired
	private TransactionRepository transrepo;

	public void createTransaction(UserEntity user, double amount, String type, String status) {
		Transaction transaction = new Transaction();
		transaction.setAmount(amount);
		transaction.setCurrency("INR");
		transaction.setType(type);
		transaction.setStatus(status);
		transaction.setTransactionDateAndTime(Timestamp.valueOf(LocalDateTime.now()));
		transaction.setUser(user);

		transrepo.save(transaction);

	}

	// To Buy (u should save the id whose buying and u can get by jwt)
	@Transactional
	public String buyProduct(String token, String productName, int quantity) {
		UserEntity user = userservice.getUserByJwtToken(token);

		
		Wallet wallet = walletrepo.findByUserId(user.getId());

		Crop product = croprepo.findByCropName(productName);

		if (product == null) {
			throw new RuntimeException("Product Not Found With :" + productName);
		}

		double totalCost = quantity * (product.getPrice()); // Convert quantity to BigDecimal if necessary at the final
															// satge

		// check if the user have enough balnce
		if (wallet.getBalance() < totalCost) {
			createTransaction(user, totalCost, "BUY", "Failed");
			throw new RuntimeException("Insufficient Balance");
		}

		// check if the stock is available or not
		if (product.getStock() < quantity) {
			createTransaction(user, totalCost, "BUY", "FAILED");
		}

		if (product.getStock() <= 0) {
			throw new RuntimeException("Insufficient stock! Product is out of stock.");
		}

		// deduct the balance
		wallet.setBalance(wallet.getBalance() - totalCost);

		// update the stock
		int newStock = product.getStock() - quantity;
		if (newStock <= 0) {
			newStock = 0;
		}
		product.setStock(newStock);

		userrepo.save(user);
		croprepo.save(product);
		walletrepo.save(wallet);

		// create a successful transaction	
		createTransaction(user, totalCost, "BUY", "COMPLETED");

		return "Purchase Successful";

	}

	public String sellProduct(String token, String productName, int quantity) {
		UserEntity user = userservice.getUserByJwtToken(token);

		Wallet wallet = walletrepo.findByUserId(user.getId());

		Crop product = croprepo.findByCropName(productName);

		if (product == null) {
			throw new RuntimeException("Product Not Found!");
		}

		double sellingCost = product.getPrice() * quantity;

		wallet.setBalance(sellingCost + wallet.getBalance());

		product.setStock(quantity + product.getStock());

		croprepo.save(product);
		walletrepo.save(wallet);
		userrepo.save(user);

		createTransaction(user, sellingCost, "SELL", "COMPLETED");

		return "Sale Successful!";
	}
}
