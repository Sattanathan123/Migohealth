package com.migohealth;

public class HospitalStaffLoginRequest {
    private String staffId;
    private String password;
    
    public HospitalStaffLoginRequest() {}
    
    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}