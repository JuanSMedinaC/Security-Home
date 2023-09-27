package com.example.securityhome.model;

import jakarta.persistence.*;

import java.util.List;
@Entity
@Table(name = "cameras")
public class Camera {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private String description;
    private String status;

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
    @JoinColumn(name = "user_id")
    User user;

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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
}
