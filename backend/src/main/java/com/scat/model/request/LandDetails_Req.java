package com.scat.model.request;

public class LandDetails_Req {

	private Long id; // Primary key

	private String village;
	private String district;
	private String pincode;
	private String state;
	private String address;
	private String locateonmap;
	private String street;
	private String cultivationType; // Added field for cultivation type
	private String landOwnership; // Added field for land ownership
	private double width; // Added field for width
	private double breadth; // Added field for breadth
	private double area;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVillage() {
		return village;
	}

	public void setVillage(String village) {
		this.village = village;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLocateonmap() {
		return locateonmap;
	}

	public void setLocateonmap(String locateonmap) {
		this.locateonmap = locateonmap;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCultivationType() {
		return cultivationType;
	}

	public void setCultivationType(String cultivationType) {
		this.cultivationType = cultivationType;
	}

	public String getLandOwnership() {
		return landOwnership;
	}

	public void setLandOwnership(String landOwnership) {
		this.landOwnership = landOwnership;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public double getBreadth() {
		return breadth;
	}

	public void setBreadth(double breadth) {
		this.breadth = breadth;
	}

	public double getArea() {
		return area;
	}

	public void setArea(double area) {
		this.area = area;
	}

}
