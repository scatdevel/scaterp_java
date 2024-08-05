package com.scat.service;

import java.util.List;
import com.scat.entity.LandDetails;

public interface LandDetailsService {
    void saveLandDetails(LandDetails landDetails);
    List<LandDetails> getAllLandDetails();
    void deleteLandDetails(Long id);
    List<LandDetails> getLandDetailsByUsername(String username);
}
