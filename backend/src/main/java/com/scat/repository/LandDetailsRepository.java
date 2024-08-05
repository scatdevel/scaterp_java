package com.scat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.scat.entity.LandDetails;
import java.util.List;
import java.util.Optional;

public interface LandDetailsRepository extends JpaRepository<LandDetails, Long> {
    List<LandDetails> findByUsername(String username);
    Optional<LandDetails> findByIdAndUsername(Long id, String username);
}
