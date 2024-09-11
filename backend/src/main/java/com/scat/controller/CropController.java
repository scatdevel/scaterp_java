package com.scat.controller;


import com.scat.entity.Crop;
import com.scat.service.impl.CropServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users/crops")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust the CORS origin as needed

public class CropController {

    @Autowired
    private CropServiceImpl cropService;

    @PostMapping("/save")
    public Crop saveCrop(@RequestParam("cropName") String cropName,
                         @RequestParam("actualProduction") double actualProduction,
                         @RequestParam("projectedProduction") double projectedProduction,
                         @RequestParam("cultivationLandValue") double cultivationLandValue,
                         @RequestParam("landValueUnit") String landValueUnit,
                         @RequestParam("cost") double cost,
                         @RequestParam("projectCost") double projectCost,
                         @RequestParam("projectionTimelineType") String projectionTimelineType,
                         @RequestParam("projectionTimelineValue") int projectionTimelineValue,
                         @RequestParam("image") MultipartFile image) throws IOException {
        Crop crop = new Crop();
        crop.setCropName(cropName);
        crop.setActualProduction(actualProduction);
        crop.setProjectedProduction(projectedProduction);
        crop.setCultivationLandValue(cultivationLandValue);
        crop.setLandValueUnit(landValueUnit);
        crop.setCost(cost);
        crop.setProjectCost(projectCost);
        crop.setProjectionTimelineType(projectionTimelineType);
        crop.setProjectionTimelineValue(projectionTimelineValue);
        crop.setImage(image.getBytes());  // Convert the image to a byte array
        return cropService.saveCrop(crop);
    }

    @GetMapping("/all")
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();
    }
    

    @GetMapping("/{id}")
    public Crop getCropById(@PathVariable Long id) {
        return cropService.getCropById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
    }
}