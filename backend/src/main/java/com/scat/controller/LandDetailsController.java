package com.scat.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scat.entity.LandDetails;
import com.scat.entity.UserEntity;
import com.scat.model.request.LandDetails_Req;
import com.scat.repository.UserRepository;
import com.scat.service.LandDetailsService;
import com.scat.service.impl.UserServiceImpl;

@RestController
@RequestMapping("/users/land-details")
public class LandDetailsController {

    private final LandDetailsService landDetailsService;
    
    private final UserServiceImpl userService;

    @Autowired
    public LandDetailsController(LandDetailsService landDetailsService, UserServiceImpl userService) {
        this.landDetailsService = landDetailsService;
        this.userService=userService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Set<LandDetails>> submitLandDetails(@RequestBody Set<LandDetails_Req> landDetails, 
    		@RequestHeader("Authorization") String jwt) throws Exception {
     
    	UserEntity user = userService.getUserByJwtToken(jwt);
    	
    	Set<LandDetails> land = landDetailsService.saveLandDetails(landDetails, user.getId());
    	
    	return new ResponseEntity<>(land, HttpStatus.OK);
    } 
    
    @GetMapping("/{id}")
    public ResponseEntity<LandDetails> getLandDetailsById(@PathVariable Long id){
		
    	Optional<LandDetails> landDetails = landDetailsService.getLandDetailsById(id);
    	
    	if(landDetails.isPresent()) {
    		return ResponseEntity.ok(landDetails.get());
    	}
    	else
    	{
    		return  ResponseEntity.notFound().build();
    	}
    }

    @GetMapping("/all")
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
