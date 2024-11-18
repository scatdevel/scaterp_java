//package com.scat.controller;
//
//
//import com.scat.entity.Crop;
//import com.scat.service.impl.CropServiceImpl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/users/crops")
//@CrossOrigin(origins = "http://localhost:5173")  // Adjust the CORS origin as needed
//
//public class CropController {
//
//    @Autowired
//    private CropServiceImpl cropService;
//
//    @PostMapping("/save")
//    public Crop saveCrop(@RequestParam("cropName") String cropName,
//                         @RequestParam("actualProduction") double actualProduction,
//                         @RequestParam("projectedProduction") double projectedProduction,
//                         @RequestParam("cultivationLandValue") double cultivationLandValue,
//                         @RequestParam("landValueUnit") String landValueUnit,
//                         @RequestParam("cost") double cost,
//                         @RequestParam("projectCost") double projectCost,
//                         @RequestParam("projectionTimelineType") String projectionTimelineType,
//                         @RequestParam("projectionTimelineValue") int projectionTimelineValue,
//                         @RequestParam("image") MultipartFile image) throws IOException {
//        Crop crop = new Crop();
//        crop.setCropName(cropName);
//        crop.setActualProduction(actualProduction);
//        crop.setProjectedProduction(projectedProduction);
//        crop.setCultivationLandValue(cultivationLandValue);
//        crop.setLandValueUnit(landValueUnit);
//        crop.setCost(cost);
//        crop.setProjectCost(projectCost);
//        crop.setProjectionTimelineType(projectionTimelineType);
//        crop.setProjectionTimelineValue(projectionTimelineValue);
//        crop.setImage(image.getBytes());  // Convert the image to a byte array
//        return cropService.saveCrop(crop);
//    }
//
//    @GetMapping("/all")
//    public List<Crop> getAllCrops() {
//        return cropService.getAllCrops();
//    }
//    
//
//    @GetMapping("/{id}")
//    public Crop getCropById(@PathVariable Long id) {
//        return cropService.getCropById(id);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public void deleteCrop(@PathVariable Long id) {
//        cropService.deleteCrop(id);
//    }
//}

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

    // POST endpoint to save a crop
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
                         @RequestParam("actualProductionUnit") String actualProductionUnit,  // Added unit fields
                         @RequestParam("projectedProductionUnit") String projectedProductionUnit,  // Added unit fields
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
        crop.setActualProductionUnit(actualProductionUnit);  // Set actual production unit
        crop.setProjectedProductionUnit(projectedProductionUnit);  // Set projected production unit
        crop.setImage(image.getBytes());  // Convert the image to a byte array

        return cropService.saveCrop(crop);  // Save the crop and return it
    }

    // GET endpoint to retrieve all crops
    @GetMapping("/all")
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();  // Return list of all crops
    }

    // GET endpoint to retrieve a crop by ID
    @GetMapping("/{id}")
    public Crop getCropById(@PathVariable Long id) {
        return cropService.getCropById(id);  // Return a single crop by ID
    }

    // DELETE endpoint to remove a crop
    @DeleteMapping("/delete/{id}")
    public void deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);  // Delete the crop by ID
    }
}
