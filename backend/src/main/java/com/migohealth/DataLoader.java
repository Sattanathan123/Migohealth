package com.migohealth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private WorkerRepository workerRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private EncryptionUtil encryptionUtil;
    
    @Autowired
    private HospitalStaffRepository hospitalStaffRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (workerRepository.count() == 0) {
            Worker worker1 = new Worker("GH-TVM-023-MW-045", encryptionUtil.encrypt("Ramesh Kumar"), 32, "Male", encryptionUtil.encrypt("Bihar"), "https://example.com/photos/ramesh.jpg");
            worker1.setNationality("Indian");
            worker1.setAadharNumber(encryptionUtil.encrypt("123456789012"));
            workerRepository.save(worker1);
            
            Worker worker2 = new Worker("GH-KCH-012-MW-089", encryptionUtil.encrypt("Priya Sharma"), 28, "Female", encryptionUtil.encrypt("Uttar Pradesh"), "https://example.com/photos/priya.jpg");
            worker2.setNationality("Indian");
            worker2.setAadharNumber(encryptionUtil.encrypt("987654321098"));
            workerRepository.save(worker2);
            
            Worker worker3 = new Worker("GH-EKM-045-MW-123", encryptionUtil.encrypt("Suresh Yadav"), 35, "Male", encryptionUtil.encrypt("Jharkhand"), "https://example.com/photos/suresh.jpg");
            worker3.setNationality("Bangladeshi");
            worker3.setPassportNumber(encryptionUtil.encrypt("BD1234567"));
            worker3.setVisaNumber(encryptionUtil.encrypt("V123456789"));
            workerRepository.save(worker3);
        }
        
        if (doctorRepository.count() == 0) {
            doctorRepository.save(new Doctor("DOC001", "NMS001", encryptionUtil.encrypt("Dr. Rajesh Kumar"), "password123", encryptionUtil.encrypt("General Medicine"), encryptionUtil.encrypt("Kerala Medical College")));
            doctorRepository.save(new Doctor("DOC002", "NMS002", encryptionUtil.encrypt("Dr. Priya Nair"), "password123", encryptionUtil.encrypt("Pediatrics"), encryptionUtil.encrypt("Trivandrum Hospital")));
        }
        
        if (hospitalStaffRepository.count() == 0) {
            hospitalStaffRepository.save(new HospitalStaff("HS001", encryptionUtil.encrypt("Nurse Lakshmi"), "password123", "Kerala Medical College", "Staff Nurse"));
            hospitalStaffRepository.save(new HospitalStaff("HS002", encryptionUtil.encrypt("Receptionist Ravi"), "password123", "Trivandrum Hospital", "Receptionist"));
        }
    }
}