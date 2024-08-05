package com.scat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.scat.entity.LandDetails;
import com.scat.repository.LandDetailsRepository;
import com.scat.service.LandDetailsService;

import java.util.List;

@Service
public class LandDetailsServiceImpl implements LandDetailsService {

    private final LandDetailsRepository landDetailsRepository;

    @Autowired
    public LandDetailsServiceImpl(LandDetailsRepository landDetailsRepository) {
        this.landDetailsRepository = landDetailsRepository;
    }

    @Override
    public void saveLandDetails(LandDetails landDetails) {
        landDetailsRepository.save(landDetails);
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
    public List<LandDetails> getLandDetailsByUsername(String username) {
        return landDetailsRepository.findByUsername(username);
    }
}
