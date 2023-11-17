package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.Alarm;
import com.example.securityhome.model.entity.Alert;
import com.example.securityhome.model.entity.Camera;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface AlertRepository extends CrudRepository<Alert, Long> {
    @Query("SELECT i FROM Alert i WHERE i.id=:id")
    List<Alert> getById(Long id);

}
