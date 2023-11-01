package com.example.securityhome.model.entitydto;

public class UserLoginDTO {

    private String i;

    private String e;

    private String p;

    public UserLoginDTO(String e, String p) {
        this.e = e;
        this.p = p;
    }

    public UserLoginDTO() {

    }

    public String getId() {
        return i;
    }

    public void setId(String id) {
        this.i = id;
    }

    public String getE() {
        return e;
    }

    public void setE(String e) {
        this.e = e;
    }

    public String getP() {
        return p;
    }

    public void setP(String p) {
        this.p = p;
    }
}
