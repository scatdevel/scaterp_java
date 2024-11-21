
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
	private double actualProduction;
	private double projectedProduction;
	private double cultivationLandValue;
	private String landValueUnit;
	private double cost;
	private double projectCost;
	private String projectionTimelineType;
	private int projectionTimelineValue;

	@Lob
	private byte[] image;

	private String actualProductionUnit;

	private String projectedProductionUnit;

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

	public void setCropName(String cropName) {
		this.cropName = cropName;
	}

	public double getActualProduction() {
		return actualProduction;
	}


	public String getActualProductionUnit() {
		return actualProductionUnit;
	}

	public void setActualProductionUnit(String actualProductionUnit) {
		this.actualProductionUnit = actualProductionUnit;
	}

	public String getProjectedProductionUnit() {
		return projectedProductionUnit;
	}

	public void setProjectedProductionUnit(String projectedProductionUnit) {
		this.projectedProductionUnit = projectedProductionUnit;
	}

	public void setActualProduction(double actualProduction) {
		this.actualProduction = actualProduction;
	}

	public double getProjectedProduction() {
		return projectedProduction;
	}

	public void setProjectedProduction(double projectedProduction) {
		this.projectedProduction = projectedProduction;
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

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
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
