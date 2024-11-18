package com.scat.model.request;

import java.sql.Date;

public class Crop_Req {

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
	    private String category;
	    
	    private String image;
	    
	    private Date createdAt;
	    
		public Date getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}
		public String getImage() {
			return image;
		}
		public void setImage(String image) {
			this.image = image;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
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
		public String getCategory() {
			return category;
		}
		public void setCategory(String category) {
			this.category = category;
		}
	    
	    
}

