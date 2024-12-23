package com.scat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scat.service.impl.TransactionServiceImpl;


@RestController
@RequestMapping("/users/transaction")
public class TransactionController {

	@Autowired
	private TransactionServiceImpl transService;
	
	@PostMapping("/buy")
	public String buyProduct(@RequestHeader("Authorization") String token, @RequestParam String product, @RequestParam int quantity){
		
		return transService.buyProduct(token, product, quantity);
		
	}
	
	@PostMapping("/sell")
	public String sellProduct(@RequestHeader("Authorization") String token, @RequestParam String product, @RequestParam int quantity ) {
		
		return transService.sellProduct(token, product, quantity);
	}
}
