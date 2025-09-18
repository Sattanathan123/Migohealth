package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private EncryptionUtil encryptionUtil;
    
    @PostMapping("/register")
    public ResponseEntity<Doctor> registerDoctor(@RequestBody DoctorRegistrationRequest request) {
        try {
            // Check if NMS number already exists
            if (doctorRepository.findByNmsNumber(request.getNmsNumber()).isPresent()) {
                return ResponseEntity.status(409).build(); // Conflict
            }
            
            // Generate doctor ID based on NMS number
            String doctorId = generateDoctorId(request.getNmsNumber());
            
            Doctor doctor = new Doctor(
                doctorId,
                request.getNmsNumber(),
                encryptionUtil.encrypt(request.getName()),
                request.getPassword(),
                encryptionUtil.encrypt(request.getSpecialization()),
                encryptionUtil.encrypt(request.getHospital())
            );
            Doctor savedDoctor = doctorRepository.save(doctor);
            // Decrypt sensitive data before sending response
            savedDoctor.setName(encryptionUtil.decrypt(savedDoctor.getName()));
            savedDoctor.setSpecialization(encryptionUtil.decrypt(savedDoctor.getSpecialization()));
            savedDoctor.setHospital(encryptionUtil.decrypt(savedDoctor.getHospital()));
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    private String generateDoctorId(String nmsNumber) {
        // Extract last 4 characters of NMS number
        String suffix = nmsNumber.length() >= 4 ? 
            nmsNumber.substring(nmsNumber.length() - 4) : 
            nmsNumber;
        return "DR-KL-" + suffix.toUpperCase();
    }
    
    @PostMapping("/login")
    public ResponseEntity<DoctorLoginResponse> loginDoctor(@RequestBody DoctorLoginRequest request) {
        Optional<Doctor> doctor = doctorRepository.findByDoctorId(request.getDoctorId());
        
        if (doctor.isPresent() && doctor.get().getPassword().equals(request.getPassword())) {
            String token = jwtUtil.generateToken(doctor.get().getDoctorId());
            DoctorLoginResponse response = new DoctorLoginResponse(
                doctor.get().getDoctorId(),
                encryptionUtil.decrypt(doctor.get().getName()),
                token
            );
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).build();
    }
}