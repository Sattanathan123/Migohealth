package com.migohealth;

import jakarta.persistence.*;

@Entity
@Table(name = "workers")
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String healthId;
    
    @Column(columnDefinition = "TEXT")
    private String name;
    private int age;
    private String gender;
    
    @Column(columnDefinition = "TEXT")
    private String originState;
    private String photoUrl;
    
    @Column(columnDefinition = "TEXT")
    private String phoneNumber;
    
    @Column(columnDefinition = "TEXT")
    private String emergencyContact;
    private String registeredBy;
    
    private String nationality;
    
    @Column(columnDefinition = "TEXT")
    private String aadharNumber;
    
    @Column(columnDefinition = "TEXT")
    private String passportNumber;
    
    @Column(columnDefinition = "TEXT")
    private String visaNumber;
    
    public Worker() {}
    
    public Worker(String healthId, String name, int age, String gender, String originState, String photoUrl) {
        this.healthId = healthId;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.originState = originState;
        this.photoUrl = photoUrl;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getHealthId() { return healthId; }
    public void setHealthId(String healthId) { this.healthId = healthId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getOriginState() { return originState; }
    public void setOriginState(String originState) { this.originState = originState; }
    
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    
    public String getRegisteredBy() { return registeredBy; }
    public void setRegisteredBy(String registeredBy) { this.registeredBy = registeredBy; }
    
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    
    public String getAadharNumber() { return aadharNumber; }
    public void setAadharNumber(String aadharNumber) { this.aadharNumber = aadharNumber; }
    
    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }
    
    public String getVisaNumber() { return visaNumber; }
    public void setVisaNumber(String visaNumber) { this.visaNumber = visaNumber; }
}