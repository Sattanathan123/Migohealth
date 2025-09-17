package com.migohealth;

public class DoctorRegistrationRequest {
    private String nmsNumber;
    private String name;
    private String password;
    private String specialization;
    private String hospital;
    
    public DoctorRegistrationRequest() {}
    
    public String getNmsNumber() { return nmsNumber; }
    public void setNmsNumber(String nmsNumber) { this.nmsNumber = nmsNumber; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    
    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
}