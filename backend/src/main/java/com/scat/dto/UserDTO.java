package com.scat.dto;

import java.io.Serializable;
import java.util.Date;

public class UserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private String password;
   
    private String fullName;
   private Long phoneNumber;
    private String bio;
    private String profilePictureUrl;
    private Date dob;
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}
	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}
    
    

}