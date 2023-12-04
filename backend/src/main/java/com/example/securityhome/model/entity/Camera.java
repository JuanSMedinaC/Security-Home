package com.example.securityhome.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "cameras")
public class Camera {

    public Camera(){

    }
    public Camera(Long id, String name, String description, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public Camera(String name, String description, String status,String url, User user) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.url=url;
        this.user = user;
    }
    public Camera(String name, String description, String status, String url) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.url = url;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String status;

    private String url;

    @ManyToMany
    @JoinTable(
            name = "camera_sensor",
            joinColumns = @JoinColumn(name = "camera_id"),
            inverseJoinColumns = @JoinColumn(name = "sensor_id")
    )
    private List<Sensor> sensors;

    @OneToMany(mappedBy = "camera")
    List<Photo> photos;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    User user;

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
