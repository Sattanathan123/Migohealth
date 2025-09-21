package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    
    @Autowired
    private EncryptionUtil encryptionUtil;
    
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }
    
    public Optional<Worker> getWorkerByHealthId(String healthId) {
        return workerRepository.findByHealthId(healthId);
    }
    
    public Worker registerWorker(WorkerRegistrationRequest request) {
        String healthId = generateHealthId(request.getOriginState());
        Worker worker = new Worker(healthId, encryptionUtil.encrypt(request.getName()), request.getAge(), 
                                 request.getGender(), encryptionUtil.encrypt(request.getOriginState()), request.getPhotoUrl());
        if (request.getPhoneNumber() != null) {
            worker.setPhoneNumber(encryptionUtil.encrypt(request.getPhoneNumber()));
        }
        if (request.getEmergencyContact() != null) {
            worker.setEmergencyContact(encryptionUtil.encrypt(request.getEmergencyContact()));
        }
        worker.setRegisteredBy(request.getRegisteredBy() != null ? request.getRegisteredBy() : "self");
        worker.setNationality(request.getNationality());
        worker.setHealthStatus(request.getHealthStatus() != null ? request.getHealthStatus() : "GREEN");
        worker.setBloodGroup(request.getBloodGroup());
        
        if ("Indian".equalsIgnoreCase(request.getNationality()) && request.getAadharNumber() != null) {
            worker.setAadharNumber(encryptionUtil.encrypt(request.getAadharNumber()));
        }
        if (!"Indian".equalsIgnoreCase(request.getNationality())) {
            if (request.getPassportNumber() != null) {
                worker.setPassportNumber(encryptionUtil.encrypt(request.getPassportNumber()));
            }
            if (request.getVisaNumber() != null) {
                worker.setVisaNumber(encryptionUtil.encrypt(request.getVisaNumber()));
            }
        }
        Worker savedWorker = workerRepository.save(worker);
        
        // Decrypt sensitive data before returning
        savedWorker.setName(encryptionUtil.decrypt(savedWorker.getName()));
        savedWorker.setOriginState(encryptionUtil.decrypt(savedWorker.getOriginState()));
        if (savedWorker.getPhoneNumber() != null) {
            savedWorker.setPhoneNumber(encryptionUtil.decrypt(savedWorker.getPhoneNumber()));
        }
        if (savedWorker.getEmergencyContact() != null) {
            savedWorker.setEmergencyContact(encryptionUtil.decrypt(savedWorker.getEmergencyContact()));
        }
        if (savedWorker.getAadharNumber() != null) {
            savedWorker.setAadharNumber(encryptionUtil.decrypt(savedWorker.getAadharNumber()));
        }
        if (savedWorker.getPassportNumber() != null) {
            savedWorker.setPassportNumber(encryptionUtil.decrypt(savedWorker.getPassportNumber()));
        }
        if (savedWorker.getVisaNumber() != null) {
            savedWorker.setVisaNumber(encryptionUtil.decrypt(savedWorker.getVisaNumber()));
        }
        return savedWorker;
    }
    
    private String generateHealthId(String originState) {
        String stateCode = getStateCode(originState);
        long count = workerRepository.count() + 1;
        return String.format("GH-%s-%03d-MW-%03d", stateCode, (count / 100) + 1, count % 1000);
    }
    
    private String getStateCode(String state) {
        switch (state.toLowerCase()) {
            case "bihar": return "BHR";
            case "uttar pradesh": return "UP";
            case "jharkhand": return "JHR";
            case "west bengal": return "WB";
            case "odisha": return "ODS";
            default: return "OTH";
        }
    }
}