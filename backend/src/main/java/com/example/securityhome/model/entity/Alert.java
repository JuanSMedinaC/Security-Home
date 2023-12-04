package com.example.securityhome.model.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String description;
    private String location;
    private Long date;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    Sensor sensor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }
}