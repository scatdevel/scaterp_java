
package com.scat.service;

import java.util.List;

import com.scat.entity.Crop;
import com.scat.entity.UserEntity;
import com.scat.model.request.Crop_Req;


public interface Crop_Service {

	
	public List<Crop> SaveCrop(Crop_Req req, UserEntity user);
	

}
