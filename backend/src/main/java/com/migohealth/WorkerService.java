package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class WorkerService {
    @Autowired
    private WorkerRepository workerRepository;
    
    public Optional<Worker> getWorkerByHealthId(String healthId) {
        return workerRepository.findByHealthId(healthId);
    }
    
    public Worker registerWorker(WorkerRegistrationRequest request) {
        String healthId = generateHealthId(request.getOriginState());
        Worker worker = new Worker(healthId, request.getName(), request.getAge(), 
                                 request.getGender(), request.getOriginState(), request.getPhotoUrl());
        worker.setPhoneNumber(request.getPhoneNumber());
        worker.setEmergencyContact(request.getEmergencyContact());
        worker.setRegisteredBy(request.getRegisteredBy() != null ? request.getRegisteredBy() : "self");
        return workerRepository.save(worker);
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