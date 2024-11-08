package com.scat.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scat.entity.LandDetails;

public interface LandDetailsRepository extends JpaRepository<LandDetails, Long> {

	Set<LandDetails> findByUserId(Long user_Id);
    
}
