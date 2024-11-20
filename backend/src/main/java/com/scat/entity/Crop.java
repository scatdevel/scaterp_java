
package com.scat.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

	private String image;
	private double actualProductionUnit;

	public double getActualProductionUnit() {
		return actualProductionUnit;
	}

	public void setActualProductionUnit(double actualProductionUnit) {
		this.actualProductionUnit = actualProductionUnit;
	}

	public double getProjectedProductionUnit() {
		return projectedProductionUnit;
	}

	public void setProjectedProductionUnit(double projectedProductionUnit) {
		this.projectedProductionUnit = projectedProductionUnit;
	}

	private double projectedProductionUnit;
	@ManyToOne
	@JoinColumn(name = "user_Id", nullable = false)
	@JsonBackReference
	private UserEntity user;
//    private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "Cat_Id")
	@JsonBackReference
	private CropCategory category;

//    @Lob
//    private byte[] image;  // Store the image as a byte array

	private Date createdAt;

	public CropCategory getCategory() {
		return category;
	}

	public void setCategory(CropCategory category) {
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setImage(String image) {
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

	public String getImage() {
		return image;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
