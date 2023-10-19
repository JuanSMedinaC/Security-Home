package com.example.securityhome.util;

import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.UserDTO;
<<<<<<< HEAD
import com.example.securityhome.model.entitydto.UserLoginDTO;
=======
>>>>>>> 37d4a9516a10fc4b9b6ec1b5f38399c97c8a1022
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


<<<<<<< HEAD
    public User isValid(UserLoginDTO user){
        var entityUser=repository.getUserByEmail(user.getE());
        try{
            if (entityUser.get(0).getPassword().equals(user.getP())) {
                return entityUser.get(0);
            }
            return null;
        }catch (NullPointerException e) {
            return null;
        }
    }

    public User findByUUID(String uuid){
        return (User) repository.findById(uuid).orElse(null);
=======
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
>>>>>>> 37d4a9516a10fc4b9b6ec1b5f38399c97c8a1022
    }
}
