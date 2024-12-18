 package com.scat.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users")
public class UserEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userId")
	private long id;

	@Column(nullable = false, unique = true)
	private String email;

	private String username;

	@Column(nullable = false)
	private String encryptedPassword;

	private String fullName;
	private Long phoneNumber;
	private String bio;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private RoleEntity role;

	@Column(name = "profile_picture_url")
	private String profilePictureUrl;

	@Column(name = "dob")
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private Date dob;

	@Column(name = "reset_token")
	private String resetToken;

	@Column(name = "reset_token_expiration")
	private Long resetTokenExpiration;
	
	private String houseNumber;
	
	private String street;
	
	private String landmark;
	
	private String locality;
	
	private String city;
	
	private String state;
	
	private Long pincode;
	
	private String country;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference
	private Set<LandDetails> land = new HashSet<LandDetails>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<Crop> crop = new ArrayList<Crop>();

	// Constructors, Getters, and Setters

	public UserEntity() {
	}

	public UserEntity(String email, String encryptedPassword, String username) {
		this.email = email;
		this.encryptedPassword = encryptedPassword;
		this.username = username;
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

	public Set<LandDetails> getLand() {
		return land;
	}

	public void setLand(Set<LandDetails> land) {
		this.land = land;
	}

	public List<Crop> getCrop() {
		return crop;
	}

	public void setCrop(List<Crop> crop) {
		this.crop = crop;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
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

	public RoleEntity getRole() {
		return role;
	}

	public void setRole(RoleEntity role) {
		this.role = role;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
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

	@Override
	public String toString() {
		return "UserEntity{" + "id=" + id + ", email='" + email + '\'' + ", role=" + role + '}';
	}
}
