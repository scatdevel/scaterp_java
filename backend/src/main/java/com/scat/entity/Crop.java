
package com.scat.entity;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
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
	private double production;
	private double cultivationLandValue;
	private String landValueUnit;
	 
	private double price;

	  
	  private String projectionTimelineType;
		private int projectionTimelineValue;

		@Lob
		private byte[] image;

		private String productionUnit;
		
		private String weatherData; // New field for weather data

	    private String soilType; // New field for soil type

	    private Date harvestDate; // New field for harvest date


	    public String getWeatherData() {
			return weatherData;
		}

		public void setWeatherData(String weatherData) {
			this.weatherData = weatherData;
		}

		public String getSoilType() {
			return soilType;
		}

		public void setSoilType(String soilType) {
			this.soilType = soilType;
		}

		public Date getHarvestDate() {
			return harvestDate;
		}

		public void setHarvestDate(Date harvestDate) {
			this.harvestDate = harvestDate;
		}


	public double getPrice() {
			return price;
		}

		public void setPrice(double price) {
			this.price = price;
		}

	public double getProduction() {
		return production;
	}

	public void setProduction(double production) {
		this.production = production;
	}

	


	public String getProductionUnit() {
		return productionUnit;
	}

	public void setProductionUnit(String productionUnit) {
		this.productionUnit = productionUnit;
	}

	@ManyToOne
	@JoinColumn(name = "user_Id", nullable = false)
	@JsonBackReference
	private UserEntity user;

	@ManyToOne
	@JoinColumn(name = "Cat_Id")
	@JsonBackReference
	private CropCategory category;

	  private LocalDate createdAt; 
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

	

	   public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public String getImageUrl() {
	        if (image != null) {
	            return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(image);
	        }
	        return null;
	    }
	
}
