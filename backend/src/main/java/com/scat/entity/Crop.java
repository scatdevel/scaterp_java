package com.scat.entity;

import java.sql.Date;
import java.util.Base64;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Crop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cropId")
	private Long id;

	private String cropName;
	private double Production;
	private double cultivationLandValue;
	private String landValueUnit;
	private double projectCost;
	private String projectionTimelineType;
	private int projectionTimelineValue;
	
	//stock  data will change according to the product
	private int stock;
	private double price;
	private String description;

	@Lob
	private byte[] image;

	private String productionUnit;

	@ManyToOne
	@JoinColumn(name = "user_Id", nullable = false)
	@JsonBackReference
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "Cat_Id")
	@JsonBackReference
	private CropCategory category;

	private Date createdAt;

	//gets and sets
	public CropCategory getCategory() {
		return category;
	}

	public void setCategory(CropCategory category) {
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public String getCropName() {
		return cropName;
	}
	

	public int getStock() {
		return stock;
	}

	public String getProductionUnit() {
		return productionUnit;
	}

	public void setProductionUnit(String productionUnit) {
		this.productionUnit = productionUnit;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public void setCropName(String cropName) {
		this.cropName = cropName;
	}


	public double getProduction() {
		return Production;
	}

	public void setProduction(double production) {
		Production = production;
	}


	public double getCultivationLandValue() {
		return cultivationLandValue;
	}

	public void setCultivationLandValue(double cultivationLandValue) {
		this.cultivationLandValue = cultivationLandValue;
	}

	public String getLandValueUnit() {
		return landValueUnit;
	}

	public void setLandValueUnit(String landValueUnit) {
		this.landValueUnit = landValueUnit;
	}


	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getProjectCost() {
		return projectCost;
	}

	public void setProjectCost(double projectCost) {
		this.projectCost = projectCost;
	}

	public String getProjectionTimelineType() {
		return projectionTimelineType;
	}

	public void setProjectionTimelineType(String projectionTimelineType) {
		this.projectionTimelineType = projectionTimelineType;
	}

	public int getProjectionTimelineValue() {
		return projectionTimelineValue;
	}

	public void setProjectionTimelineValue(int projectionTimelineValue) {
		this.projectionTimelineValue = projectionTimelineValue;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	   public String getImageUrl() {
	        if (image != null) {
	            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(image);
	        }
	        return null;
	    }
	
}
