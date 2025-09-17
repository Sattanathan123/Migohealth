package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    
    @PostMapping("/upload/{workerHealthId}")
    public ResponseEntity<Prescription> uploadPrescription(
            @PathVariable String workerHealthId,
            @RequestBody PrescriptionUploadRequest request) {
        
        // Mock OCR processing
        String extractedText = "Mock OCR: " + request.getPrescriptionText();
        
        Prescription prescription = new Prescription(
            workerHealthId,
            request.getDoctorId(),
            extractedText,
            request.getImageUrl()
        );
        
        Prescription savedPrescription = prescriptionRepository.save(prescription);
        return ResponseEntity.ok(savedPrescription);
    }
    
    @GetMapping("/worker/{healthId}")
    public ResponseEntity<List<Prescription>> getWorkerPrescriptions(@PathVariable String healthId) {
        List<Prescription> prescriptions = prescriptionRepository.findByWorkerHealthIdOrderByCreatedAtDesc(healthId);
        return ResponseEntity.ok(prescriptions);
    }
}