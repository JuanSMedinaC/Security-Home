package com.example.securityhome.util;

import com.example.securityhome.model.Repository.UserRepository;
import com.example.securityhome.model.entity.User;
import com.example.securityhome.model.entitydto.UserDTO;
import com.example.securityhome.model.entitydto.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Authentication {

    private UserRepository repository;

    @Autowired
    public void setRepository(UserRepository repository){
        this.repository = repository;
    }


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
    }
}
