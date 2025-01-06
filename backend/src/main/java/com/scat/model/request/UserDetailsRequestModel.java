package com.scat.model.request;

import java.sql.Date;

public class UserDetailsRequestModel {

    private String username;
    private String email;
    private String password;
	private String fullName;
    private Long phoneNumber;
    
    private Long aadharCardNumber;
    private String aadharImageUrl_1;
    private String aadharImageUrl_2;
    
    private String bio;
    private Date dob;
    private String roleName;
    private Long roleId;
    public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public Date getDob() {
		return dob;
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

	public void setAadharImageUrl_1(String aadharImageUrl_1) {
		this.aadharImageUrl_1 = aadharImageUrl_1;
	}

	public String getAadharImageUrl_2() {
		return aadharImageUrl_2;
	}

	public void setAadharImageUrl_2(String aadharImageUrl_2) {
		this.aadharImageUrl_2 = aadharImageUrl_2;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	
	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
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

 
}
