package com.scat.repository;

import com.scat.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    UserEntity findByUsername(String username);
    List<UserEntity> findByRole_Id(Long roleId);
    
   
    
    boolean existsByRoleId(Long roleId);
}
