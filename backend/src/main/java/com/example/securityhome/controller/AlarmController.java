package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.AlarmRepository;
import com.example.securityhome.model.entity.Alarm;
import com.example.securityhome.model.entitydto.AlarmDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AlarmController {

    @Autowired
    private Authentication auth;

    private AlarmRepository repository;

    @Autowired
    public void setRepository(AlarmRepository repository) {
        this.repository = repository;
    }

    @PostMapping("alert/add")
    public ResponseEntity<?> addAlert(@RequestHeader("Authorization") String authorization, @org.jetbrains.annotations.NotNull @RequestBody AlarmDTO alarm) {
        Alarm alarmEntity = new Alarm(alarm.getName(), alarm.getType(), alarm.getReference(), alarm.getLocation(), alarm.getStatus());
        if (auth.findByUUID(authorization) != null) {

            try {
                if (repository.getAlarmByName(alarm.getName()).get(0) != null) {
                    return ResponseEntity.status(409).body("Alarm already created");
                }
            }catch(Exception e){
                e.printStackTrace();
                repository.save(alarmEntity);
                return ResponseEntity.status(200).body(alarm);
            }
        }
        return ResponseEntity.status(403).body("Couldn't create correctly");
    }

     @PutMapping("alert/update")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authorization, @RequestBody AlarmDTO alarm ) {
        if (auth.findByUUID(authorization) != null) {
            try{
                var aux = repository.getAlarmByName(alarm.getName()).get(0);
                if (repository.getAlarmByName(alarm.getName()).get(0) != null) {
                    aux.setStatus(alarm.getStatus());
                    repository.save(aux);
                    return ResponseEntity.status(200).body(aux);
                }
            }catch (Exception e){
                return ResponseEntity.status(404).body("Camera not found");
            }

        }
         return ResponseEntity.status(403).body("Couldn't update correctly");
    }
}
