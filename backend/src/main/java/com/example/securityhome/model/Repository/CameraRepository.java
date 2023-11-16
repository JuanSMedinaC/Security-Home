package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.example.securityhome.model.entity.Camera;

import java.util.List;

public interface CameraRepository extends CrudRepository<Camera,String>{
    @Query("SELECT c FROM Camera c WHERE c.name=:name")
    List<Camera> getCameraByName(String name);

}
