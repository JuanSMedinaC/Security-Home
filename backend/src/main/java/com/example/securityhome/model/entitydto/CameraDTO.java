package com.example.securityhome.model.entitydto;

public class CameraDTO {

    private String id;

    private String name;
    private String description;
    private String status;
    private String url;

    public CameraDTO(){

    }

    public CameraDTO(String name){
        this.name = name;
    }

    public CameraDTO(String name, String description, String status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}