package com.example.securityhome.model.entitydto;

import java.util.Date;

public class AlertDTO {
    private String description;
    private String location;
    private Long date;

    private Long id;

    public AlertDTO() {

    }

    public AlertDTO(String description, String location, Long date) {
        this.description = description;
        this.location = location;
        this.date = date;
    }
    public AlertDTO(String description, String location, Long date, Long id) {
        this.description = description;
        this.location = location;
        this.date = date;
        this.id = id;
    }

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }
}
