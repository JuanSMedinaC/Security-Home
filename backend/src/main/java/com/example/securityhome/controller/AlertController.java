package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.AlarmRepository;
import com.example.securityhome.model.Repository.AlertRepository;
import com.example.securityhome.model.entity.Alert;
import com.example.securityhome.model.entitydto.AlertDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

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

}
