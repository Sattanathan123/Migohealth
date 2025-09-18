package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/hospital-staff")
@CrossOrigin(origins = "http://localhost:3000")
public class HospitalStaffController {
    @Autowired
    private HospitalStaffRepository hospitalStaffRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private EncryptionUtil encryptionUtil;
    
    @PostMapping("/register")
    public ResponseEntity<HospitalStaff> registerStaff(@RequestBody HospitalStaffRegistrationRequest request) {
        try {
            // Check if staff ID already exists
            if (hospitalStaffRepository.findByStaffId(request.getStaffId()).isPresent()) {
                return ResponseEntity.status(409).build(); // Conflict
            }
            
            HospitalStaff staff = new HospitalStaff(
                request.getStaffId(),
                encryptionUtil.encrypt(request.getName()),
                request.getPassword(),
                request.getHospitalName(),
                request.getDesignation()
            );
            HospitalStaff savedStaff = hospitalStaffRepository.save(staff);
            // Decrypt sensitive data before sending response
            savedStaff.setName(encryptionUtil.decrypt(savedStaff.getName()));
            return ResponseEntity.ok(savedStaff);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<HospitalStaffLoginResponse> loginStaff(@RequestBody HospitalStaffLoginRequest request) {
        Optional<HospitalStaff> staff = hospitalStaffRepository.findByStaffId(request.getStaffId());
        
        if (staff.isPresent() && staff.get().getPassword().equals(request.getPassword())) {
            String token = jwtUtil.generateToken(staff.get().getStaffId());
            HospitalStaffLoginResponse response = new HospitalStaffLoginResponse(
                staff.get().getStaffId(),
                encryptionUtil.decrypt(staff.get().getName()),
                staff.get().getHospitalName(),
                token
            );
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).build();
    }
}