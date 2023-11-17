package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.Sensor;
import org.springframework.data.repository.CrudRepository;

public interface SensorRepository extends CrudRepository<Sensor, Long> {
}
