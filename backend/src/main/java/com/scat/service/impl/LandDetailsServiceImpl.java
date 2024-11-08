package com.scat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scat.entity.LandDetails;
import com.scat.entity.UserEntity;
import com.scat.model.request.LandDetails_Req;
import com.scat.repository.LandDetailsRepository;
import com.scat.repository.UserRepository;
import com.scat.service.LandDetailsService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LandDetailsServiceImpl implements LandDetailsService {

    private final LandDetailsRepository landDetailsRepository;
    
    private final UserRepository userRepo;

    @Autowired
    public LandDetailsServiceImpl(LandDetailsRepository landDetailsRepository, UserRepository userRepo) {
        this.landDetailsRepository = landDetailsRepository;
        this.userRepo = userRepo;
    }

    @Override
    public Set<LandDetails> saveLandDetails(Set<LandDetails_Req> landDetailsReq, Long user_Id) {
        UserEntity user = userRepo.findById(user_Id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Set<LandDetails> savedLandDetails = new HashSet<>(); // Use HashSet to avoid duplicates

        // Iterate over the provided land details requests
        for (LandDetails_Req landDetails : landDetailsReq) {
            // Create a new LandDetails object
            LandDetails land = new LandDetails();
            land.setId(landDetails.getId());
            land.setVillage(landDetails.getVillage());
            land.setAddress(landDetails.getAddress());
            land.setArea(landDetails.getArea());
            land.setBreadth(landDetails.getBreadth());
            land.setCultivationType(landDetails.getCultivationType());
            land.setDistrict(landDetails.getDistrict());
            land.setId(landDetails.getId());
            land.setLandOwnership(landDetails.getLandOwnership());
            land.setLocateonmap(landDetails.getLocateonmap());
            land.setPincode(landDetails.getPincode());
            land.setState(landDetails.getState());
            land.setStreet(landDetails.getStreet());
            
            if(!user.getLand().contains(land)) {
            	land.setUser(user);
            	user.getLand().add(land);
            	savedLandDetails.add(land);
            }else {
            	throw new RuntimeException("Duplicate LandDetails Found For User");
            }
  
    }
        userRepo.save(user);	
        return savedLandDetails;
    }

    @Override
    public List<LandDetails> getAllLandDetails() {
        return landDetailsRepository.findAll();
    }

    @Override
    public void deleteLandDetails(Long id) {
        landDetailsRepository.deleteById(id);
    }

    @Override
    public Set<LandDetails> getLandDetailsByUserId(Long user_Id) {
        return landDetailsRepository.findByUserId(user_Id);
    }
    
    @Override
    public Optional<LandDetails> getLandDetailsById(Long id){
    	return landDetailsRepository.findById(id);
    }

}