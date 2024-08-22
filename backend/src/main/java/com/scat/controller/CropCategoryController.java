package com.scat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.scat.entity.CropCategory;
import com.scat.service.impl.CropCategoryServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/crops/categories")
public class CropCategoryController {

    @Autowired
    private CropCategoryServiceImpl service;

    @GetMapping("/get/all")
    public ResponseEntity<List<CropCategory>> getAllCategories() {
        List<CropCategory> categories = service.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CropCategory> getCategoryById(@PathVariable Long id) {
        Optional<CropCategory> category = service.getCategoryById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam(value = "picture", required = false) MultipartFile picture) {
        
        try {
            CropCategory category = new CropCategory();
            category.setName(name);
            category.setDescription(description);
            if (picture != null && !picture.isEmpty()) {
                category.setPicture(picture.getBytes());
            }

            CropCategory savedCategory = service.addCategory(category);
            return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Error processing file", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/block")
    public ResponseEntity<Void> blockCategory(@PathVariable Long id) {
        service.blockCategory(id);
        return ResponseEntity.noContent().build();
    }
}

