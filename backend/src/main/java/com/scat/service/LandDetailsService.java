package com.scat.service;

import java.util.List;
import java.util.Optional;

import com.scat.entity.LandDetails;

public interface LandDetailsService {
    void saveLandDetails(LandDetails landDetails);
    List<LandDetails> getAllLandDetails();
    void deleteLandDetails(Long id);
    List<LandDetails> getLandDetailsByUsername(String username);
   Optional<LandDetails> getLandDetailsById(Long id);
}
