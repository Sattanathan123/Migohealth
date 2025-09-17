package com.migohealth;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String workerHealthId;
    private String doctorId;
    private String prescriptionText;
    private String imageUrl;
    private LocalDateTime createdAt;
    
    public Prescription() {}
    
    public Prescription(String workerHealthId, String doctorId, String prescriptionText, String imageUrl) {
        this.workerHealthId = workerHealthId;
        this.doctorId = doctorId;
        this.prescriptionText = prescriptionText;
        this.imageUrl = imageUrl;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getWorkerHealthId() { return workerHealthId; }
    public void setWorkerHealthId(String workerHealthId) { this.workerHealthId = workerHealthId; }
    
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    
    public String getPrescriptionText() { return prescriptionText; }
    public void setPrescriptionText(String prescriptionText) { this.prescriptionText = prescriptionText; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}