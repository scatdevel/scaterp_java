package com.scat.service.impl;

import com.scat.entity.Crop;
import com.scat.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropServiceImpl {

    @Autowired
    private CropRepository cropRepository;

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
