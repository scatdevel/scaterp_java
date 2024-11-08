package com.scat.service.impl;

import com.scat.entity.Crop;
import com.scat.entity.UserEntity;
import com.scat.model.request.Crop_Req;
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
    private UserRepository userrepo;

//    public List<Crop> saveCrop(Crop_Req cropdt, Long user_Id) {
//    	
//    	Crop crop = new Crop();
//    	crop.setActualProduction(cropdt.getActualProduction());
//        crop.setCost(cropdt.getCost());
//        crop.setCropName(cropdt.getCropName());
//        crop.setCultivationLandValue(cropdt.getCultivationLandValue());
//        crop.setId(cropdt.getId());
//        crop.setCreatedAt(cropdt.getCreatedAt());
////        crop.setImage(cropdt.getImage());
//        crop.setLandValueUnit(cropdt.getLandValueUnit());
//        crop.setProjectCost(cropdt.getProjectCost());
//        crop.setProjectedProduction(cropdt.getProjectedProduction());
//        crop.setProjectionTimelineType(cropdt.getProjectionTimelineType());
//        crop.setProjectionTimelineValue(cropdt.getProjectionTimelineValue());
//    	
//    	
//    	UserEntity user = userrepo.findById(user_Id).orElseThrow(()-> new RuntimeException("User Not Found"));
//    	 crop.setUser(user);
//    	 
//        return null;
//    }
    public Crop saveCrop(Crop crop) {
    	return cropRepository.save(crop);
    }

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    public Crop getCropById(Long id) {
        return cropRepository.findById(id).orElse(null);
    }

    public void deleteCrop(Long id) {
        cropRepository.deleteById(id);
    }
}
