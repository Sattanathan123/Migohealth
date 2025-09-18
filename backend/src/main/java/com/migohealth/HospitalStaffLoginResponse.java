package com.migohealth;

public class HospitalStaffLoginResponse {
    private String staffId;
    private String name;
    private String hospitalName;
    private String token;
    
    public HospitalStaffLoginResponse() {}
    
    public HospitalStaffLoginResponse(String staffId, String name, String hospitalName, String token) {
        this.staffId = staffId;
        this.name = name;
        this.hospitalName = hospitalName;
        this.token = token;
    }
    
    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}