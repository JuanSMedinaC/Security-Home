package com.example.securityhome.model.Repository;


import com.example.securityhome.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.email=:email")
    List<User> getUserByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.id=:id")
    List<User> getUserByID(String id);


}
