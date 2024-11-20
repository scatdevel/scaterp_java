
package com.scat.service.impl;

import com.scat.entity.Crop;
import com.scat.entity.CropCategory;
import com.scat.entity.UserEntity;
import com.scat.model.request.Crop_Req;
import com.scat.repository.CropCategoryRepository;
import com.scat.repository.CropRepository;
import com.scat.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class CropServiceImpl {

    @Autowired
    private CropRepository cropRepository;
    
    @Autowired
    private UserRepository userRepo;  
    
    @Autowired
    private CropCategoryRepository catRepo;
    
    public List<Crop> saveCrop(Crop_Req cropdt, Long user_Id) {
        // Create a new Crop object
        Crop crop = new Crop();
        crop.setActualProduction(cropdt.getActualProduction());
        crop.setCost(cropdt.getCost());
        crop.setCropName(cropdt.getCropName());
        crop.setCultivationLandValue(cropdt.getCultivationLandValue());
        crop.setId(cropdt.getId());
        crop.setCreatedAt(cropdt.getCreatedAt());
        crop.setImage(cropdt.getImage());
        crop.setLandValueUnit(cropdt.getLandValueUnit());
        crop.setProjectCost(cropdt.getProjectCost());
        crop.setProjectedProduction(cropdt.getProjectedProduction());
        crop.setProjectionTimelineType(cropdt.getProjectionTimelineType());
        crop.setProjectionTimelineValue(cropdt.getProjectionTimelineValue());
crop.setActualProductionUnit(cropdt.getActualProductionUnit());
crop.setProjectedProduction(cropdt.getProjectedProductionUnit());
        // Find the user and associate with the crop
        UserEntity user = userRepo.findById(user_Id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        crop.setUser(user);

       CropCategory category = catRepo.findByName(cropdt.getCategory())
    		   .orElseThrow(() -> new RuntimeException("Category Not Found"));
       crop.setCategory(category);
    		   
        // Save the crop
        Crop savedCrop = cropRepository.save(crop);
        
        // Return a List containing the saved crop
        return Collections.singletonList(savedCrop);
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
}
