package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.Alert;
import org.springframework.data.repository.CrudRepository;


public interface AlertRepository extends CrudRepository<Alert, String> {
}
