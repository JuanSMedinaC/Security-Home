package com.example.securityhome.model.entitydto;

import java.util.Date;

public class AlertDTO {
    private String description;
    private String location;
    private Long date;

    public AlertDTO(String description, String location, Long date) {
        this.description = description;
        this.location = location;
        this.date = date;
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
