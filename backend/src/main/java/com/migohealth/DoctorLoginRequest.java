package com.migohealth;

public class DoctorLoginRequest {
    private String doctorId;
    private String password;
    
    public DoctorLoginRequest() {}
    
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}