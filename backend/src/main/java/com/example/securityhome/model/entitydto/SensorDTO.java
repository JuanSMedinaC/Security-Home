package com.example.securityhome.model.entitydto;

public class SensorDTO {

    private String id;
    private String name;

    private String type;

    private String reference;

    private String location;

    private String status;

    public SensorDTO(String name, String type, String reference, String location, String status, String id) {
        this.name = name;
        this.type = type;
        this.reference = reference;
        this.location = location;
        this.status = status;
        this.id = id;
    }

    public SensorDTO() {
    }

    public SensorDTO(String name, String location, String status) {
        this.name = name;
        this.location = location;
        this.status = status;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
