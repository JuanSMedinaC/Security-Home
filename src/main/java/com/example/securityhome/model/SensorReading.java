package com.example.securityhome.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sensor_readings")
public class SensorReading {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double values;
    private String units;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    Sensor sensor;

    public double getValues() {
        return values;
    }

    public void setValues(double values) {
        this.values = values;
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
