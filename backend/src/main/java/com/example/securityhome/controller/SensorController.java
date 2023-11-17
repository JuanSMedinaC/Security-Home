package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.SensorReadingRepository;
import com.example.securityhome.model.Repository.SensorRepository;
import com.example.securityhome.model.entity.Sensor;
import com.example.securityhome.model.entity.SensorReading;
import com.example.securityhome.model.entitydto.SensorDTO;
import com.example.securityhome.model.entitydto.SensorReadingDTO;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(maxAge = 3600)
public class SensorController {
    private SensorRepository sensorRepository;

    @Autowired
    public void setRepository(SensorRepository repository) {
        this.sensorRepository = repository;
    }

    private SensorReadingRepository readingRepository;

    @Autowired
    public void setRepository(SensorReadingRepository repository) {
        this.readingRepository = repository;
    }


    @GetMapping("sensor/{id}")
    public ResponseEntity<?> getSensorById(@RequestHeader("Authorization") String authorization, @PathVariable String id){
        Long lid= Long.parseLong(id);
        Sensor sensorEntity=sensorRepository.findById(lid).orElse(null);
        SensorDTO sensorDTO = new SensorDTO();
        sensorDTO.setName(sensorEntity.getName());
        sensorDTO.setStatus(sensorEntity.getStatus());
        sensorDTO.setLocation(sensorEntity.getLocation());
        return ResponseEntity.status(200).body(sensorDTO);
    }

    @GetMapping("reading/last/{id}")
    public ResponseEntity<?> getLastReadingFromSensor(@RequestHeader("Authorization") String authorization, @PathVariable String id) {
        Long lastId=readingRepository.getMaxId();
        SensorReading sensorReading=readingRepository.findById(lastId).orElse(null);
        SensorReadingDTO sensorReadingDTO = new SensorReadingDTO();
        sensorReadingDTO.setSensorValues(String.valueOf(sensorReading.getValues()));
        sensorReadingDTO.setUnits(sensorReading.getUnits());
        return ResponseEntity.status(200).body(sensorReadingDTO);
    }

}
