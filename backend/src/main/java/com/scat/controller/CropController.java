 package com.scat.controller;


import com.scat.entity.Crop;
import com.scat.entity.UserEntity;
import com.scat.model.request.Crop_Req;
import com.scat.service.impl.CropServiceImpl;
import com.scat.service.impl.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.events.EventException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users/crops")
@CrossOrigin(origins = "http://localhost:5173")  // Adjust the CORS origin as needed

public class CropController {

    @Autowired
    private CropServiceImpl cropService;
    
    @Autowired
    private  UserServiceImpl userService;

    @PostMapping("/save")
    public ResponseEntity<List<Crop>> saveCrops(
            @RequestBody List<Crop_Req> cropDetails,
            @RequestHeader("Authorization") String jwt) throws Exception {
        
        UserEntity user = userService.getUserByJwtToken(jwt);
        
        List<Crop> savedCrops = new ArrayList<>();
        
        // Iterate through each Crop_Req and save it
        for (Crop_Req cropReq : cropDetails) {
            List<Crop> savedCrop = cropService.saveCrop(cropReq, user.getId());
            savedCrops.addAll(savedCrop); // Add the saved crop to the list
        }
        
        return new ResponseEntity<>(savedCrops, HttpStatus.OK);
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