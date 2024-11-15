package com.scat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scat.entity.CropCategory;

@Repository
public interface CropCategoryRepository extends JpaRepository<CropCategory, Long> {
	
	Optional<CropCategory> findByName(String name);
}
