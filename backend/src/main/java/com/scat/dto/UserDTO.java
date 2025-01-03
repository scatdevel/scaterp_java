package com.scat.dto;

import java.sql.Date;

public class UserDTO {
    private long id;
    private String email;
    private String username;
    private String encryptedPassword;
    private String fullName;
    private Long phoneNumber;
    private String bio;
    private String gender;
    private String prefix;
    private String role;
    private Long roleId;
    private String profilePictureUrl;
    private Date dob;
    private String resetToken;
    private Long resetTokenExpiration;
    
    private Long aadharCardNumber;
    private String aadharImageUrl_1;
    private String aadharImageUrl_2;
    
    private Long farmerCardNumber;
    private String farmerCardImage;
    
    private String houseNumber;
    private String street;
    private String landmark;
    private String locality;
    private String city;
    private String state;
    private Long pincode;
    private String country;

    // Add wallet as part of the response DTO
    private WalletDTO wallet;  // A new class that maps wallet data
 
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Long getAadharCardNumber() {
		return aadharCardNumber;
	}

	public void setAadharCardNumber(Long aadharCardNumber) {
		this.aadharCardNumber = aadharCardNumber;
	}

	public String getAadharImageUrl_1() {
		return aadharImageUrl_1;
	}
	
	public Long getFarmerCardNumber() {
		return farmerCardNumber;
	}

	public void setFarmerCardNumber(Long farmerCardNumber) {
		this.farmerCardNumber = farmerCardNumber;
	}

	public String getFarmerCardImage() {
		return farmerCardImage;
	}

	public void setFarmerCardImage(String farmerCardImage) {
		this.farmerCardImage = farmerCardImage;
	}

	public void setAadharImageUrl_1(String aadharImageUrl_1) {
		this.aadharImageUrl_1 = aadharImageUrl_1;
	}

	public String getAadharImageUrl_2() {
		return aadharImageUrl_2;
	}

	public void setAadharImageUrl_2(String aadharImageUrl_2) {
		this.aadharImageUrl_2 = aadharImageUrl_2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public Long getResetTokenExpiration() {
		return resetTokenExpiration;
	}

	public void setResetTokenExpiration(Long resetTokenExpiration) {
		this.resetTokenExpiration = resetTokenExpiration;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Long getPincode() {
		return pincode;
	}

	public void setPincode(Long pincode) {
		this.pincode = pincode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public WalletDTO getWallet() {
		return wallet;
	}

	public void setWallet(WalletDTO wallet) {
		this.wallet = wallet;
	}

    
    // Getters and Setters for these fields
    
}
