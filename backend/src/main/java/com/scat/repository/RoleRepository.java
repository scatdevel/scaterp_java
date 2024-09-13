package com.scat.repository;

import com.scat.entity.RoleEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
	 Optional<RoleEntity> findByName(String name);
	 
	  Optional<RoleEntity> findById(Long id);
	
}
