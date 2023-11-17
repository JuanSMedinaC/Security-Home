package com.example.securityhome.model.entitydto;

import jakarta.persistence.*;


public class SensorReadingDTO {
    private String sensorValues;
    private String units;

    public SensorReadingDTO() {
    }

    public SensorReadingDTO(String sensorValues, String units) {
        this.sensorValues = sensorValues;
        this.units = units;
    }

    public String getSensorValues() {
        return sensorValues;
    }

    public void setSensorValues(String sensorValues) {
        this.sensorValues = sensorValues;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }
}