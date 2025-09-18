package com.migohealth;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String doctorId;
    
    @Column(unique = true, nullable = false)
    private String nmsNumber;
    
    @Column(columnDefinition = "TEXT")
    private String name;
    
    private String password;
    
    @Column(columnDefinition = "TEXT")
    private String specialization;
    
    @Column(columnDefinition = "TEXT")
    private String hospital;
    
    public Doctor() {}
    
    public Doctor(String doctorId, String nmsNumber, String name, String password, String specialization, String hospital) {
        this.doctorId = doctorId;
        this.nmsNumber = nmsNumber;
        this.name = name;
        this.password = password;
        this.specialization = specialization;
        this.hospital = hospital;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    
    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
    
    public String getNmsNumber() { return nmsNumber; }
    public void setNmsNumber(String nmsNumber) { this.nmsNumber = nmsNumber; }
}