package com.example.securityhome.model.Repository;

import com.example.securityhome.model.entity.Alarm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AlarmRepository extends CrudRepository<Alarm, String> {

    @Query("SELECT a FROM Alarm a WHERE a.name=:name")
    List<Alarm> getAlarmByName(String name);
}
