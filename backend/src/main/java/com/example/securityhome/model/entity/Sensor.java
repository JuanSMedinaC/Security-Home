package com.example.securityhome.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "sensors")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String type;
    private String reference;
    private String location;
    private String status;

    public Sensor(String name, String type, String reference, String location, String status) {
        this.name = name;
        this.type = type;
        this.reference = reference;
        this.location = location;
        this.status = status;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToMany
    private List<Alarm> alarms;

    @OneToMany(mappedBy = "sensor")
    List<Alert> alerts;
    @JsonIgnore
    @OneToMany(mappedBy = "sensor")
    List<SensorReading> sensorReadings;

    @ManyToMany
    List<Camera> cameras;

    public Sensor() {

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Alert> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<Alert> alerts) {
        this.alerts = alerts;
    }

    public List<SensorReading> getSensorReadings() {
        return sensorReadings;
    }

    public void setSensorReadings(List<SensorReading> sensorReadings) {
        this.sensorReadings = sensorReadings;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Alarm> getAlarms() {
        return alarms;
    }

    public void setAlarms(List<Alarm> alarms) {
        this.alarms = alarms;
    }
}
