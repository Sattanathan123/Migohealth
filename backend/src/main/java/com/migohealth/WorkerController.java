package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkerController {
    @Autowired
    private WorkerService workerService;
    
    @Autowired
    private EncryptionUtil encryptionUtil;
    
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    
    @GetMapping("/{healthId}")
    public ResponseEntity<Worker> getWorkerByHealthId(@PathVariable String healthId) {
        Optional<Worker> worker = workerService.getWorkerByHealthId(healthId);
        if (worker.isPresent()) {
            Worker w = worker.get();
            // Decrypt sensitive data before sending response
            w.setName(encryptionUtil.decrypt(w.getName()));
            w.setOriginState(encryptionUtil.decrypt(w.getOriginState()));
            if (w.getPhoneNumber() != null) w.setPhoneNumber(encryptionUtil.decrypt(w.getPhoneNumber()));
            if (w.getEmergencyContact() != null) w.setEmergencyContact(encryptionUtil.decrypt(w.getEmergencyContact()));
            if (w.getAadharNumber() != null) w.setAadharNumber(encryptionUtil.decrypt(w.getAadharNumber()));
            if (w.getPassportNumber() != null) w.setPassportNumber(encryptionUtil.decrypt(w.getPassportNumber()));
            if (w.getVisaNumber() != null) w.setVisaNumber(encryptionUtil.decrypt(w.getVisaNumber()));
            return ResponseEntity.ok(w);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/{healthId}/prescriptions")
    public ResponseEntity<?> getWorkerPrescriptions(@PathVariable String healthId) {
        try {
            Optional<Worker> worker = workerService.getWorkerByHealthId(healthId);
            if (worker.isPresent()) {
                return ResponseEntity.ok(prescriptionRepository.findByWorkerHealthIdOrderByCreatedAtDesc(healthId));
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<Worker> registerWorker(@RequestBody WorkerRegistrationRequest request) {
        Worker worker = workerService.registerWorker(request);
        return ResponseEntity.ok(worker);
    }
}