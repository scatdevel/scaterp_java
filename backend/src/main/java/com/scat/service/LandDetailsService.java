package com.scat.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.scat.entity.LandDetails;
import com.scat.model.request.LandDetails_Req;

public interface LandDetailsService {
    List<LandDetails> getAllLandDetails();
    void deleteLandDetails(Long id);
   Optional<LandDetails> getLandDetailsById(Long id);
   	Set<LandDetails> saveLandDetails(Set<LandDetails_Req> landDetails, Long user_Id);
	Set<LandDetails> getLandDetailsByUserId(Long user_Id);
}
