package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.RoleRepository;
import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.Role;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.UserDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UsersController {
    @Autowired
    private Authentication auth;

    private UserRepository repository;

    @Autowired
    public void setRepository(UserRepository repository){
        this.repository = repository;
    }

    private RoleRepository roleRepository;

    @Autowired
    public void setRepository(RoleRepository repository){
        this.roleRepository = repository;
    }

    @PostMapping("login")
    public ResponseEntity<?> logIn(@RequestBody UserDTO user){
        if (auth.isValid(user)!=null){
            return ResponseEntity.status(200).body("Login successful");
        }
        return ResponseEntity.status(403).body("Incorrect user data");
    }

    @PostMapping("user/register")
    public ResponseEntity<?> register(@RequestHeader("Authorization") String authorization, @RequestBody UserDTO user ) {
        User userEntity = new User(user.getN(), user.getE(), user.getP());
        userEntity.setId(UUID.randomUUID().toString());
        var role = roleRepository.findById(2L).orElse(null);
        if (role != null) {
            userEntity.setRole(role);
        }else{
            return ResponseEntity.status(501).body("Couldn't create user");
        }
        var users = repository.findAll();
        if (auth.findByUUID(authorization)!=null&& auth.findByUUID(authorization).getRole().getType().equals("admin")){
            for (User userE : users) {
                if (user.getE().equals(userE.getEmail())) {
                    return ResponseEntity.status(409).body("user already created");
                }
            }
            repository.save(userEntity);
            return ResponseEntity.status(200).body(user);
        }else {
            return ResponseEntity.status(403).body("Need to log as admin");
        }
    }

    @GetMapping("user/all")
    public ResponseEntity<?> listAll(@RequestHeader("Authorization") String authorization){
        var users = repository.findAll();
        if (auth.findByUUID(authorization)!=null&& auth.findByUUID(authorization).getRole().getType().equals("admin")){
            return ResponseEntity.status(200).body(users);
        }
        return ResponseEntity.status(409).body("Incorrect UUID");
    }

}