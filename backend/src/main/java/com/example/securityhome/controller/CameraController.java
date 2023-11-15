package com.example.securityhome.controller;


import com.example.securityhome.model.Repository.CameraRepository;
import com.example.securityhome.model.entity.Camera;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.CameraDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CameraController {
    @Autowired
    private Authentication auth;

    private CameraRepository camRe;

    @Autowired
    public void setRepository(CameraRepository cameraRepository) {
        this.camRe = cameraRepository;
    }

    @PostMapping("AddCamera")
    public ResponseEntity<?> addCamera(@RequestHeader("Authorization") String authorization, @RequestBody CameraDTO cam) {
        Camera camEntity = new Camera(cam.getName(), cam.getDescription(), cam.getStatus());
        if (auth.findByUUID(authorization) != null) {
            try {
                if (camRe.getCameraByName(cam.getName()).get(0) != null) {
                    return ResponseEntity.status(409).body("camera was already created");
                }
            } catch (Exception e) {
                camRe.save(camEntity);
                return ResponseEntity.status(200).body("camera successfully added");
            }
        }
            return ResponseEntity.status(403).body("Couldn't be added a camera correctly");
    }
}