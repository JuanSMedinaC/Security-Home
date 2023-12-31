package com.example.securityhome.model.entitydto;

public class UserDTO {

    private String id;

    private String n;

    private String e;

    private String p;

    private Long r;

    public UserDTO() {
    }

    public UserDTO(String n, String e, String p) {
        this.n = n;
        this.e = e;
        this.p = p;
    }

    public String getN() {
        return n;
    }

    public void setN(String n) {
        this.n = n;
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

    public Long getR() {
        return r;
    }

    public void setR(Long r) {
        this.r = r;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
