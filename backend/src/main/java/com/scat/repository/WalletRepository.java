package com.scat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scat.entity.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

}