package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.AlarmRepository;
import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.Alarm;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.AlarmDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(maxAge = 3600)
public class AlarmController {

    @Autowired
    private Authentication auth;

    private AlarmRepository repository;

    @Autowired
    public void setRepository(AlarmRepository repository) {
        this.repository = repository;
    }

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("alarm/all")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String authorization) {
        if (auth.findByUUID(authorization) != null) {
            var alarms = repository.findAll();
            var output = new ArrayList<AlarmDTO>();
            alarms.forEach(a -> {
                output.add(
                        new AlarmDTO(a.getName(), a.getType(), a.getReference(), a.getLocation(),a.getStatus())
                );
            });
            return ResponseEntity.status(200).body(output);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }

    }

    @PostMapping("alarm/add")
    public ResponseEntity<?> addAlarm(@RequestHeader("Authorization") String authorization, @org.jetbrains.annotations.NotNull @RequestBody AlarmDTO alarm) {
        User user = userRepository.getUserByID(authorization).get(0);
        Alarm alarmEntity = new Alarm(alarm.getName(), alarm.getType(), alarm.getReference(), alarm.getLocation(), alarm.getStatus(), user);
        if (auth.findByUUID(authorization) != null) {

            try {
                if (repository.getAlarmByName(alarm.getName()).get(0) != null) {
                    return ResponseEntity.status(409).body("Alarm already created");
                }
            }catch(Exception e){
                repository.save(alarmEntity);
                return ResponseEntity.status(200).body(alarm);
            }
        }
        return ResponseEntity.status(403).body("Couldn't create correctly");
    }

     @PutMapping("alarm/update")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authorization, @RequestBody AlarmDTO alarm ) {
        if (auth.findByUUID(authorization) != null) {
            try{
                var aux = repository.getAlarmByName(alarm.getName()).get(0);
                if (repository.getAlarmByName(alarm.getName()).get(0) != null) {
                    if(aux.getStatus().equalsIgnoreCase("Inactivo")){
                        aux.setStatus("Activo");
                        repository.save(aux);
                        return ResponseEntity.status(200).body(aux);
                    } else if(aux.getStatus().equalsIgnoreCase("Activo")){
                        aux.setStatus("Inactivo");
                        repository.save(aux);
                        return ResponseEntity.status(200).body(aux);
                    }
                }
            }catch (Exception e){
                return ResponseEntity.status(404).body("Alarm not found");
            }

        }
         return ResponseEntity.status(403).body("Couldn't update correctly");
    }
}
