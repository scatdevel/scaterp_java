package com.scat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scat.entity.CropCategory;

@Repository
public interface CropCategoryRepository extends JpaRepository<CropCategory, Long> {
	
}
