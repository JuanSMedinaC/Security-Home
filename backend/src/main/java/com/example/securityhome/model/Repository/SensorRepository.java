package com.example.securityhome.model.Repository;


import com.example.securityhome.model.entity.Sensor;
import com.example.securityhome.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SensorRepository extends CrudRepository<Sensor, String> {
    @Query("SELECT u FROM Sensor u WHERE u.reference=:reference")
    List<Sensor> getSensorByReference(String reference);


}