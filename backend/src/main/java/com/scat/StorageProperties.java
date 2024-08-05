package com.scat;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

 
  private String location = "C:\\Users\\SCAT-1\\scat_17\\scat\\public\\img\\profile";

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

}