//package com.scat.controller;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.scat.entity.LandDetails;
//import com.scat.service.LandDetailsService;
//
//@RestController
//@RequestMapping("/users/land-details")
//public class LandDetailsController {
//
//    private final LandDetailsService landDetailsService;
//
//    @Autowired
//    public LandDetailsController(LandDetailsService landDetailsService) {
//        this.landDetailsService = landDetailsService;
//    }
//
//    @PostMapping("/submit")
//    public ResponseEntity<String> submitLandDetails(@RequestBody LandDetails landDetails) {
//        try {
//            landDetailsService.saveLandDetails(landDetails);
//            return new ResponseEntity<>("Form submitted successfully!", HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Failed to submit form", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//    
//    @GetMapping("/{id}")
//    public ResponseEntity<LandDetails> getLandDetailsById(@PathVariable Long id){
//		
//    	Optional<LandDetails> landDetails = landDetailsService.getLandDetailsById(id);
//    	
//    	if(landDetails.isPresent()) {
//    		return ResponseEntity.ok(landDetails.get());
//    	}
//    	else
//    	{
//    		return  ResponseEntity.notFound().build();
//    	}
//    	
//    	
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<LandDetails>> getAllLandDetails() {
//        List<LandDetails> landDetailsList = landDetailsService.getAllLandDetails();
//        return new ResponseEntity<>(landDetailsList, HttpStatus.OK);
//    }
//    @PutMapping("/{id}")
//    public ResponseEntity<String> updateLandDetails(@PathVariable Long id, @RequestBody LandDetails updatedLandDetails) {
//        try {
//            if (!landDetailsService.getLandDetailsById(id).isPresent()) {
//                return ResponseEntity.notFound().build();
//            }
//            updatedLandDetails.setId(id); // Ensure the ID is set for the entity
//            landDetailsService.saveLandDetails(updatedLandDetails);
//            return new ResponseEntity<>("Updated successfully!", HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Failed to update", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteLandDetails(@PathVariable Long id) {
//        try {
//            landDetailsService.deleteLandDetails(id);
//            return new ResponseEntity<>("Deleted successfully!", HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Failed to delete", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//}

package com.scat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scat.entity.LandDetails;
import com.scat.service.LandDetailsService;
import com.scat.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users/land-details")
public class LandDetailsController {

    private final LandDetailsService landDetailsService;
    private final UserService userService;

    @Autowired
    public LandDetailsController(LandDetailsService landDetailsService, UserService userService) {
        this.landDetailsService = landDetailsService;
        this.userService = userService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitLandDetails(@RequestBody LandDetails landDetails) {
        try {
            landDetails.setUser(userService.getCurrentUser()); // Set current user
            landDetailsService.saveLandDetails(landDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body("Land details submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit land details: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<LandDetails> getLandDetailsById(@PathVariable Long id) {
        return landDetailsService.getLandDetailsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<LandDetails>> getAllLandDetails() {
        List<LandDetails> landDetailsList = landDetailsService.getAllLandDetails();
        return ResponseEntity.ok(landDetailsList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateLandDetails(@PathVariable Long id, @RequestBody LandDetails updatedLandDetails) {
        try {
            if (!landDetailsService.getLandDetailsById(id).isPresent()) {
                return ResponseEntity.notFound().build();
            }
            updatedLandDetails.setId(id); // Ensure the ID is set
            landDetailsService.saveLandDetails(updatedLandDetails);
            return ResponseEntity.ok("Updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLandDetails(@PathVariable Long id) {
        try {
            landDetailsService.deleteLandDetails(id);
            return ResponseEntity.ok("Deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete: " + e.getMessage());
        }
    }
}
