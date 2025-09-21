package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private WorkerRepository workerRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private PrescriptionRepository prescriptionRepository;
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get counts from database
        long totalWorkers = workerRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalPrescriptions = prescriptionRepository.count();
        
        // Health status counts (mock data for now)
        Map<String, Long> healthStatusCounts = new HashMap<>();
        healthStatusCounts.put("GREEN", Math.round(totalWorkers * 0.72)); // 72% healthy
        healthStatusCounts.put("ORANGE", Math.round(totalWorkers * 0.21)); // 21% moderate risk
        healthStatusCounts.put("RED", Math.round(totalWorkers * 0.07)); // 7% critical
        
        stats.put("totalWorkers", totalWorkers);
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalPrescriptions", totalPrescriptions);
        stats.put("activeHospitals", 45);
        stats.put("healthStatusCounts", healthStatusCounts);
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/doctor-stats/{doctorId}")
    public ResponseEntity<Map<String, Object>> getDoctorStats(@PathVariable String doctorId) {
        Map<String, Object> stats = new HashMap<>();
        
        // Get doctor-specific stats
        long doctorPrescriptions = prescriptionRepository.countByDoctorId(doctorId);
        
        stats.put("totalPatients", 24); // Can be calculated from unique workers treated
        stats.put("prescriptions", doctorPrescriptions);
        stats.put("consultations", 42); // Can be calculated from prescription history
        
        return ResponseEntity.ok(stats);
    }
}