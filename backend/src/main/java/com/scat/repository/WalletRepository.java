package com.scat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scat.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

    // Find the Wallet by the associated User's ID
    Wallet findByUserId(Long userId);

    // Find the balance for the given User ID (this can be useful for efficiency)
    double findBalanceByUserId(Long userId);
}