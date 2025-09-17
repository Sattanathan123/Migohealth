package com.migohealth;

public class DoctorLoginResponse {
    private String doctorId;
    private String name;
    private String token;
    
    public DoctorLoginResponse() {}
    
    public DoctorLoginResponse(String doctorId, String name, String token) {
        this.doctorId = doctorId;
        this.name = name;
        this.token = token;
    }
    
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}