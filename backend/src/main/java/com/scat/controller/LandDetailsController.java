package com.scat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scat.entity.LandDetails;
import com.scat.service.LandDetailsService;

@RestController
@RequestMapping("/users/land-details")
public class LandDetailsController {

    private final LandDetailsService landDetailsService;

    @Autowired
    public LandDetailsController(LandDetailsService landDetailsService) {
        this.landDetailsService = landDetailsService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitLandDetails(@RequestBody LandDetails landDetails) {
        try {
            landDetailsService.saveLandDetails(landDetails);
            return new ResponseEntity<>("Form submitted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to submit form", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<LandDetails>> getAllLandDetails() {
        List<LandDetails> landDetailsList = landDetailsService.getAllLandDetails();
        return new ResponseEntity<>(landDetailsList, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLandDetails(@PathVariable Long id) {
        try {
            landDetailsService.deleteLandDetails(id);
            return new ResponseEntity<>("Deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
