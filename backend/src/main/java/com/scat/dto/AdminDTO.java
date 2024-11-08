package com.scat.dto;

import java.util.List;

public class AdminDTO {

	private Long id;
	private String email;
	private String password;
	private String username;
	
	private List<String> rolenames;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRolenames() {
		return rolenames;
	}

	public void setRolenames(List<String> rolenames) {
		this.rolenames = rolenames;
	}
	
	
}
