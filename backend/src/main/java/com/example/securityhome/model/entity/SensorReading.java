package com.example.securityhome.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "sensor_readings")
public class SensorReading {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int sensorValues;
    private String units;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "sensor_id")
    Sensor sensor;

    public SensorReading() {
    }

    public int getValues() {
        return sensorValues;
    }

    public void setValues(int sensorValues) {
        this.sensorValues = sensorValues;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
