package com.migohealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Prescription controller is working!");
    }

    @PostMapping("/upload/{healthId}")
    public ResponseEntity<Map<String, Object>> uploadPrescription(
            @PathVariable String healthId,
            @RequestBody Map<String, Object> prescriptionData) {
        
        System.out.println("Received prescription upload request for healthId: " + healthId);
        System.out.println("Prescription data: " + prescriptionData);
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String doctorId = (String) prescriptionData.get("doctorId");
            String prescriptionText = (String) prescriptionData.get("prescriptionText");
            String imageUrl = (String) prescriptionData.get("imageUrl");
            
            System.out.println("Processing - Doctor ID: " + doctorId);
            System.out.println("Processing - Prescription Text Length: " + (prescriptionText != null ? prescriptionText.length() : 0));
            
            response.put("success", true);
            response.put("message", "Prescription uploaded successfully");
            response.put("healthId", healthId);
            response.put("doctorId", doctorId);
            response.put("timestamp", System.currentTimeMillis());
            
            System.out.println("Sending success response: " + response);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("Error processing prescription: " + e.getMessage());
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Failed to upload prescription: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}