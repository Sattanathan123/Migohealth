package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

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
    
    @GetMapping
    public ResponseEntity<?> getAllWorkers() {
        try {
            List<Worker> workers = workerService.getAllWorkers();
            // Decrypt sensitive data for each worker
            for (Worker w : workers) {
                try {
                    if (w.getName() != null) w.setName(encryptionUtil.decrypt(w.getName()));
                } catch (Exception e) {
                    // If decryption fails, keep original value
                }
                try {
                    if (w.getOriginState() != null) w.setOriginState(encryptionUtil.decrypt(w.getOriginState()));
                } catch (Exception e) {
                    // If decryption fails, keep original value
                }
                if (w.getPhoneNumber() != null) {
                    try {
                        w.setPhoneNumber(encryptionUtil.decrypt(w.getPhoneNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getEmergencyContact() != null) {
                    try {
                        w.setEmergencyContact(encryptionUtil.decrypt(w.getEmergencyContact()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getAadharNumber() != null) {
                    try {
                        w.setAadharNumber(encryptionUtil.decrypt(w.getAadharNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getPassportNumber() != null) {
                    try {
                        w.setPassportNumber(encryptionUtil.decrypt(w.getPassportNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getVisaNumber() != null) {
                    try {
                        w.setVisaNumber(encryptionUtil.decrypt(w.getVisaNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
            }
            return ResponseEntity.ok(workers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    @GetMapping("/{healthId}")
    public ResponseEntity<Worker> getWorkerByHealthId(@PathVariable String healthId) {
        try {
            Optional<Worker> worker = workerService.getWorkerByHealthId(healthId);
            if (worker.isPresent()) {
                Worker w = worker.get();
                // Decrypt sensitive data before sending response
                try {
                    if (w.getName() != null) w.setName(encryptionUtil.decrypt(w.getName()));
                } catch (Exception e) {
                    // If decryption fails, keep original value
                }
                try {
                    if (w.getOriginState() != null) w.setOriginState(encryptionUtil.decrypt(w.getOriginState()));
                } catch (Exception e) {
                    // If decryption fails, keep original value
                }
                if (w.getPhoneNumber() != null) {
                    try {
                        w.setPhoneNumber(encryptionUtil.decrypt(w.getPhoneNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getEmergencyContact() != null) {
                    try {
                        w.setEmergencyContact(encryptionUtil.decrypt(w.getEmergencyContact()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getAadharNumber() != null) {
                    try {
                        w.setAadharNumber(encryptionUtil.decrypt(w.getAadharNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getPassportNumber() != null) {
                    try {
                        w.setPassportNumber(encryptionUtil.decrypt(w.getPassportNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                if (w.getVisaNumber() != null) {
                    try {
                        w.setVisaNumber(encryptionUtil.decrypt(w.getVisaNumber()));
                    } catch (Exception e) {
                        // If decryption fails, keep original value
                    }
                }
                return ResponseEntity.ok(w);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
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