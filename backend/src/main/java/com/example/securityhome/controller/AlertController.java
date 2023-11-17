package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.AlarmRepository;
import com.example.securityhome.model.Repository.AlertRepository;
import com.example.securityhome.model.Repository.SensorReadingRepository;
import com.example.securityhome.model.Repository.SensorRepository;
import com.example.securityhome.model.entity.Alert;
import com.example.securityhome.model.entity.Sensor;
import com.example.securityhome.model.entity.SensorReading;
import com.example.securityhome.model.entitydto.SensorReadingDTO;
import com.example.securityhome.model.entitydto.AlertDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@CrossOrigin(maxAge = 3600)
public class AlertController {

    @Autowired
    private Authentication auth;

    private AlertRepository repository;

    @Autowired
    public void setRepository(AlertRepository repository) {
        this.repository = repository;
    }

    private SensorRepository sensorRepository;

    @Autowired
    public void setRepository(SensorRepository repository) {
        this.sensorRepository = repository;
    }

    private SensorReadingRepository sensorReadingRepository;

    @Autowired
    public void setRepository(SensorReadingRepository repository) {
        this.sensorReadingRepository = repository;
    }

    @GetMapping("alert/all")
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") String authorization) {
        if (auth.findByUUID(authorization) != null) {
            var alerts = repository.findAll();
            var output = new ArrayList<AlertDTO>();
            alerts.forEach(a -> {
                output.add(
                        new AlertDTO(a.getDescription(), a.getLocation(), a.getDate())
                );
            });
            return ResponseEntity.status(200).body(output);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }

    }

    @PostMapping("alert/sensor/add")
    public ResponseEntity<?> addSensorAlert(@RequestHeader("Authorization") Long id, AlertDTO alert){
        if (sensorRepository.findById(id).orElse(null) != null) {
            Alert alertEntity = new Alert();
            alertEntity.setSensor(sensorRepository.findById(id).orElse(null));
            alertEntity.setDate(System.currentTimeMillis());
            alertEntity.setDescription("El Dispositivo "+ sensorRepository.findById(id).orElse(null).getName()+ " en el lugar "+ sensorRepository.findById(id).orElse(null).getLocation()+ " ha detectado un movimiento.");
            alertEntity.setLocation(sensorRepository.findById(id).orElse(null).getLocation());
            repository.save(alertEntity);
            return ResponseEntity.status(200).body(alertEntity);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }
    }

    @PostMapping("reading/sensor/add")
    public ResponseEntity<?> addSensorReading(@RequestHeader("Authorization") Long id, @RequestBody SensorReadingDTO sensorReadingDTO){
        System.out.println(sensorReadingDTO.getSensorValues());
        System.out.println(sensorReadingDTO.getUnits());
        if (sensorRepository.findById(id).orElse(null) != null) {
            SensorReading sensorReading = new SensorReading();
            sensorReading.setUnits(sensorReadingDTO.getUnits());
            sensorReading.setValues(Integer.parseInt(sensorReadingDTO.getSensorValues()));
            sensorReading.setSensor(sensorRepository.findById(id).orElse(null));
            sensorReadingRepository.save(sensorReading);
            return ResponseEntity.status(200).body(sensorReading);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }
    }

}
