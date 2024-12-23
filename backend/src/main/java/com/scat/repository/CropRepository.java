package com.scat.repository;

import com.scat.entity.Crop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {

	List<Crop> findByUserId(Long userId);
//	Optional<CropCategory> findByName(String name);
	
	Crop findByCropName(String name);
}
