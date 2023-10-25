package com.example.securityhome.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sensor_readings")
public class SensorReading {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private float sensorValues;
    private String units;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    Sensor sensor;

    public double getValues() {
        return sensorValues;
    }

    public void setValues(float sensorValues) {
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
