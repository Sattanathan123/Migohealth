package com.migohealth;

public class PrescriptionUploadRequest {
    private String doctorId;
    private String prescriptionText;
    private String imageUrl;
    
    public PrescriptionUploadRequest() {}
    
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    
    public String getPrescriptionText() { return prescriptionText; }
    public void setPrescriptionText(String prescriptionText) { this.prescriptionText = prescriptionText; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}