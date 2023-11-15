package com.example.securityhome.controller;

import com.example.securityhome.model.Repository.RoleRepository;
import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.UserDTO;
import com.example.securityhome.model.entitydto.UserLoginDTO;
import com.example.securityhome.util.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(maxAge = 3600)
public class UsersController {
    @Autowired
    private Authentication auth;

    private UserRepository repository;

    @Autowired
    public void setRepository(UserRepository repository) {
        this.repository = repository;
    }

    private RoleRepository roleRepository;

    @Autowired
    public void setRepository(RoleRepository repository) {
        this.roleRepository = repository;
    }

    @PostMapping("login")
    public ResponseEntity<?> logIn(@RequestBody UserLoginDTO user) {
        if (auth.isValid(user) != null) {
            var entityUser = repository.getUserByEmail(user.getE());
            UserDTO userDto = new UserDTO();
            userDto.setId(entityUser.get(0).getId());
            userDto.setN(entityUser.get(0).getName());
            userDto.setE(entityUser.get(0).getEmail());
            userDto.setP(entityUser.get(0).getPassword());
            userDto.setR(entityUser.get(0).getRole().getId());
            return ResponseEntity.status(200).body(userDto);

        }
        return ResponseEntity.status(403).body("Incorrect user data");
    }

    @GetMapping("auth")
    public ResponseEntity<?> auth(@RequestHeader("Authorization") String authorization){
        var user = auth.findByUUID(authorization);
        if (user != null){
            UserDTO userDto = new UserDTO();
            userDto.setN(user.getName());
            userDto.setE(user.getEmail());
            userDto.setP(user.getPassword());
            userDto.setR(user.getRole().getId());
            return ResponseEntity.status(200).body(userDto);
        }
        return ResponseEntity.status(409).body("Forbidden");
    }

    @PostMapping("user/register")
    public ResponseEntity<?> register(@RequestHeader("Authorization") String authorization, @RequestBody UserDTO user) {

        if (auth.findByUUID(authorization) != null && auth.findByUUID(authorization).getRole().getType().equals("admin")) {
            try{
                if (repository.getUserByEmail(user.getE()).get(0) != null) {
                    return ResponseEntity.status(409).body("Email is already used");
                }
            }catch (IndexOutOfBoundsException e) {
                User userEntity = new User(user.getN(), user.getE(), user.getP());
                userEntity.setId(UUID.randomUUID().toString());
                var role = roleRepository.findById(2L).orElse(null);
                if (role != null) {
                    userEntity.setRole(role);
                } else {
                    return ResponseEntity.status(501).body("Couldn't create user");
                }
                repository.save(userEntity);
                return ResponseEntity.status(200).body(user);
            }
        }

        return ResponseEntity.status(403).body("Need to log as admin");
    }

    @GetMapping("user/all")
    public ResponseEntity<?> listAll(@RequestHeader("Authorization") String authorization) {
        var users = repository.findAll();
        if (auth.findByUUID(authorization) != null && auth.findByUUID(authorization).getRole().getType().equals("admin")) {
            return ResponseEntity.status(200).body(users);
        }
        return ResponseEntity.status(403).body("Incorrect UUID");
    }

    @PostMapping("user/edit/mail")
    public ResponseEntity<?> editMail(@RequestHeader("Authorization") String authorization, @RequestBody UserDTO user) {
        if (auth.findByUUID(authorization) != null) {
            if (repository.findById(authorization).orElse(null).getPassword().equals(user.getP())) {
                User userEntity = repository.findById(authorization).orElse(null);
                userEntity.setEmail(user.getE());
                user.setN(userEntity.getName());
                repository.save(userEntity);
                return ResponseEntity.status(200).body(user);
            }

        }

        return ResponseEntity.status(403).body("Couldn't be edited correctly");
    }

    @PostMapping("user/edit/password")
    public ResponseEntity<?> editPass(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> json) {
        if (auth.findByUUID(authorization) != null) {
            if (repository.findById(authorization).orElse(null).getPassword().equals(json.get("oldPass"))) {
                User userEntity = repository.findById(authorization).orElse(null);
                userEntity.setPassword(json.get("newPass"));
                UserDTO user = new UserDTO();
                user.setN(userEntity.getName());
                user.setE(userEntity.getEmail());
                user.setP(userEntity.getPassword());
                repository.save(userEntity);
                return ResponseEntity.status(200).body(user);
            }

        }
        return ResponseEntity.status(403).body("Conflict on editing password");
    }

    @PostMapping("user/edit/name")
    public ResponseEntity<?> editName(@RequestHeader("Authorization") String authorization, @RequestBody UserDTO user) {
        if (auth.findByUUID(authorization) != null) {
            if (repository.findById(authorization).orElse(null).getPassword().equals(user.getP())) {
                User userEntity = repository.findById(authorization).orElse(null);
                userEntity.setName(user.getN());
                user.setE(userEntity.getEmail());
                repository.save(userEntity);
                return ResponseEntity.status(200).body(user);
            }
        }
        return ResponseEntity.status(403).body("Couldn't be edited correctly");
    }

    @DeleteMapping("user/delete")
    public ResponseEntity<?> deleteAccount(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> json){
        if (auth.findByUUID(authorization) != null) {
            if (repository.findById(authorization).orElse(null).getPassword().equals(json.get("pass"))) {
                repository.delete(repository.findById(authorization).orElse(null));
                return ResponseEntity.status(200).body("Deleted correctly");
            }
        }
        return ResponseEntity.status(403).body("Couldn't delete account");
    }
}
