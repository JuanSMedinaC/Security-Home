package com.example.securityhome.model.Repository;


import com.example.securityhome.model.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> { }