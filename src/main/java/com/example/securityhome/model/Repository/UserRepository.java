package com.example.securityhome.model.Repository;


import com.example.securityhome.model.entity.User;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.email=:email")
    List<User> getUserByEmail(String email);

}
=======
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> { }
>>>>>>> 37d4a9516a10fc4b9b6ec1b5f38399c97c8a1022
