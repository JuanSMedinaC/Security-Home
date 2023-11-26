package com.example.securityhome.controller;


import com.example.securityhome.model.Repository.SensorRepository;
import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.Sensor;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.SensorDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(maxAge = 3600)
public class SensorsController {


    @Autowired
    private Authentication auth;

    private SensorRepository repository;
    private String authorization;
    private SensorDTO sensor;

    @Autowired
    public void setRepository(SensorRepository repository){
        this.repository = repository;
    }

    @PostMapping("sensor/add")
    public ResponseEntity<?> addSensor(@RequestHeader("Authorization") String authorization,  @RequestBody SensorDTO sensor) {
        Sensor sensorEntity = new Sensor(sensor.getName(), sensor.getType(), sensor.getReference(), sensor.getLocation(), sensor.getStatus());

            if (auth.findByUUID(authorization) != null) {
                try{
                    if(repository.getSensorByReference(sensor.getReference()).get(0)!=null){
                        return ResponseEntity.status(409).body("Sensor created");
                    }

                } catch (Exception e) {
                    repository.save(sensorEntity);
                    return ResponseEntity.status(200).body(sensor);
                }
            }
            return ResponseEntity.status(403).body("Couldn't create");
    }

    @GetMapping("sensor/all")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String authorization) {
        if (auth.findByUUID(authorization) != null) {
            var sensors = repository.findAll();
            var output = new ArrayList<SensorDTO>();
            sensors.forEach(s -> {
                output.add(
                        new SensorDTO(s.getName(), s.getType(), s.getReference(), s.getLocation(),s.getStatus(), s.getId().toString())
                );
            });
            return ResponseEntity.status(200).body(output);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }

    }


    @DeleteMapping("sensor/delete")
    public ResponseEntity<?> deleteSensor(@RequestHeader("Authorization") String authorization, @RequestBody SensorDTO sensor) {
        if (auth.findByUUID(authorization) != null) {
            try {
                var senAux = repository.getSensorByReference(sensor.getReference()).get(0);
                if (senAux != null) {
                    repository.delete(senAux);
                    return ResponseEntity.status(200).body("camera correctly deleted");
                }
            } catch (Exception e) {
                return ResponseEntity.status(404).body("camera not found");
            }
        }return ResponseEntity.status(403).body("You do not have authorization");
    }


    @PutMapping("sensor/update")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String authorization, @RequestBody SensorDTO sensor) {
            if (auth.findByUUID(authorization) != null) {
                try {
                    var aux = repository.getSensorByReference(sensor.getReference()).get(0);
                    if (repository.getSensorByReference(sensor.getReference()).get(0) != null) {
                        if (aux.getStatus().equalsIgnoreCase("Inactivo")) {
                            aux.setStatus("Activo");
                            repository.save(aux);
                            return ResponseEntity.status(200).body(aux);
                        } else if (aux.getStatus().equalsIgnoreCase("Activo")) {
                            aux.setStatus("Inactivo");
                            repository.save(aux);
                            return ResponseEntity.status(200).body(aux);
                        }
                    }
                } catch (Exception e) {
                    return ResponseEntity.status(404).body("Sensor not found");
                }
            }

        return ResponseEntity.status(403).body("Couldn't update correctly");
    }


}