package com.scat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scat.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
