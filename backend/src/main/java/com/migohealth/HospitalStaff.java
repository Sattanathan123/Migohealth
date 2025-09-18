package com.migohealth;

import jakarta.persistence.*;

@Entity
@Table(name = "hospital_staff")
public class HospitalStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String staffId;
    
    @Column(columnDefinition = "TEXT")
    private String name;
    
    private String password;
    private String hospitalName;
    private String designation;
    
    public HospitalStaff() {}
    
    public HospitalStaff(String staffId, String name, String password, String hospitalName, String designation) {
        this.staffId = staffId;
        this.name = name;
        this.password = password;
        this.hospitalName = hospitalName;
        this.designation = designation;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
}