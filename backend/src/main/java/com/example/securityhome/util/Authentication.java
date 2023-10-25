package com.example.securityhome.util;

import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class Authentication {

    private UserRepository repository;

    @Autowired
    public void setRepository(UserRepository repository){
        this.repository = repository;
    }


    public User isValid(UserDTO user){
        var users=repository.findAll();
        User registeredUser;
        for (User userE : users){
            if(user.getE().equals(userE.getEmail())){
                if (user.getP().equals(userE.getPassword())){
                    return userE;
                }
            }
        }
        return null;
    }

    public User findByUUID(String uuid){
        var users=repository.findAll();
        for (User userE : users){
            if(uuid.equals(userE.getId())){
                return userE;
            }
        }
        return null;
    }
}
