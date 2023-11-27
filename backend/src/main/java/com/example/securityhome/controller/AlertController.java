package com.example.securityhome.controller;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import com.example.securityhome.model.Repository.AlertRepository;
import com.example.securityhome.model.Repository.SensorReadingRepository;
import com.example.securityhome.model.Repository.SensorRepository;
import com.example.securityhome.model.entity.Alert;
import com.example.securityhome.model.entity.EmergencyContact;
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
                        new AlertDTO(a.getDescription(), a.getLocation(), a.getDate(), a.getId())
                );
            });
            return ResponseEntity.status(200).body(output);
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }
    }

    @DeleteMapping("delete/Evento/Historial")
    public ResponseEntity<?> deleteEventHist(@RequestHeader("Authorization") String authorization, @RequestBody AlertDTO alert) {
        if (auth.findByUUID(authorization) != null) {
            try {
                var alertAux = repository.getById(alert.getId()).get(0);
                if (alertAux != null) {
                    repository.delete(alertAux);
                    return ResponseEntity.status(200).body("correctly deleted");
                }
            } catch (Exception e) {
                return ResponseEntity.status(404).body("Not found");
            }
        }
        return ResponseEntity.status(403).body("You do not have authorization");
    }

    @PostMapping("alert/sensor/add")
    public ResponseEntity<?> addSensorAlert(@RequestHeader("Authorization") Long id) throws Exception{
        if (sensorRepository.findById(id).orElse(null) != null) {
            Alert alertEntity = new Alert();
            alertEntity.setSensor(sensorRepository.findById(id).orElse(null));
            alertEntity.setDate(System.currentTimeMillis());
            alertEntity.setDescription("El Dispositivo " + sensorRepository.findById(id).orElse(null).getName() + " en el lugar " + sensorRepository.findById(id).orElse(null).getLocation() + " ha detectado un movimiento y ha activado la alarma.");
            Sensor sensor = sensorRepository.findById(id).orElse(null);
            alertEntity.setLocation(sensor.getLocation());
            repository.save(alertEntity);
            EmergencyContact email;
            email = new EmergencyContact("secuhome123@outlook.com", sensor.getName(), "majovace2003@gmail.com");
            email.sendEmail();
            return ResponseEntity.status(200).body("Alerta notificada satisfactoriamente");
        } else {
            return ResponseEntity.status(400).body("No autorizado");
        }
    }

    @PostMapping("reading/sensor/add")
    public ResponseEntity<?> addSensorReading(@RequestHeader("Authorization") Long id, @RequestBody SensorReadingDTO sensorReadingDTO) {
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
