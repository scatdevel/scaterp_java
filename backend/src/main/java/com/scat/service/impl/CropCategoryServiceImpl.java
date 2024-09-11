package com.scat.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scat.entity.CropCategory;
import com.scat.repository.CropCategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CropCategoryServiceImpl {

	@Autowired
	private CropCategoryRepository repository;

	public List<CropCategory> getAllCategories() {
		return repository.findAll();
	}

	public Optional<CropCategory> getCategoryById(Long id) {
		return repository.findById(id);
	}

	public CropCategory addCategory(CropCategory category) {
		return repository.save(category);
	}
	

	public void deleteCategory(Long id) {
		repository.deleteById(id);
	}

	 public void blockCategory(Long id) {
	        Optional<CropCategory> optionalCategory = repository.findById(id);
	        if (optionalCategory.isPresent()) {
	            CropCategory category = optionalCategory.get();
	            category.setBlocked(true); // Set the blocked status
	            repository.save(category); // Save the updated category
	        } else {
	            throw new RuntimeException("Category not found with id: " + id);
	        }
	    }
}


