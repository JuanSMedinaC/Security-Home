package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.SensorReading;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SensorReadingRepository extends CrudRepository<SensorReading, Long> {
    @Query(value = "SELECT COALESCE(MAX(sr.id), 0) FROM SensorReading sr")
    public Long getMaxId();
}
