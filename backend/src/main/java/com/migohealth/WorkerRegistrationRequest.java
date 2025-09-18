package com.migohealth;

public class WorkerRegistrationRequest {
    private String name;
    private int age;
    private String gender;
    private String originState;
    private String photoUrl;
    private String phoneNumber;
    private String emergencyContact;
    private String registeredBy;
    private String nationality;
    private String aadharNumber;
    private String passportNumber;
    private String visaNumber;
    
    public WorkerRegistrationRequest() {}
    
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