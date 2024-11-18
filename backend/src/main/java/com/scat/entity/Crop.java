package com.scat.entity;

import javax.persistence.*;
import java.util.Base64;
import java.util.Date;

@Entity
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // Add units for actual and projected production
    private String actualProductionUnit;
    private String projectedProductionUnit;

    @Lob
    private byte[] image;  // Store the image as a byte array

    private Date createdAt;

    // Getters and Setters

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

    // Add getters and setters for the new unit fields
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    // Method to return the image URL as a base64 string
    public String getImageUrl() {
        if (image != null) {
            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(image);
        }
        return null;
    }
}
