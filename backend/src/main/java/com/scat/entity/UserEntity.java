package com.scat.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity implements Serializable {
	
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long id;

	    private String username;
	    private String email;
	    private String encryptedPassword;
	    
	    private String fullName;
	    private Long phoneNumber;
	    private String bio;

	    @Column(name = "profile_picture_url")
	    private String profilePictureUrl;

	    @Column(name = "dob")
		@Temporal(TemporalType.DATE)
		private Date dob;
	    

	    @Column(name = "reset_token")
	    private String resetToken;

	    @Column(name = "reset_token_expiration")
	    private Long resetTokenExpiration; // Stored as Unix timestamp
	    
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

		public static long getSerialversionuid() {
			return serialVersionUID;
		}

	public Date getDob() {
			return dob;
		}

		public void setDob(Date dob) {
			this.dob = dob;
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

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}

	private static final long serialVersionUID = 1L;



   
}