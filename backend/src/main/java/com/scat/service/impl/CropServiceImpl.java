
package com.scat.service.impl;

import com.scat.entity.Crop;
import com.scat.repository.CropRepository;
import com.scat.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropServiceImpl {

    @Autowired
    private CropRepository cropRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Crop saveCrop(Crop crop) {
        return cropRepository.save(crop);
    }


    public List<Crop> getAllCrops() {
        return  cropRepository.findAll();
    }

    public Crop getCropById(Long id) {
        return cropRepository.findById(id).orElse(null);
    }

    public void deleteCrop(Long id) {
        cropRepository.deleteById(id);
    }


	public List<Crop> getCropsByUser(String userName) {
		Long userId = userRepository.getUserByUsername(userName).getId();
		return cropRepository.findByUserId(userId);
	}

}







