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
    
    @Override
    public void run(String... args) throws Exception {
        if (workerRepository.count() == 0) {
            workerRepository.save(new Worker("GH-TVM-023-MW-045", "Ramesh Kumar", 32, "Male", "Bihar", "https://example.com/photos/ramesh.jpg"));
            workerRepository.save(new Worker("GH-KCH-012-MW-089", "Priya Sharma", 28, "Female", "Uttar Pradesh", "https://example.com/photos/priya.jpg"));
            workerRepository.save(new Worker("GH-EKM-045-MW-123", "Suresh Yadav", 35, "Male", "Jharkhand", "https://example.com/photos/suresh.jpg"));
        }
        
        if (doctorRepository.count() == 0) {
            doctorRepository.save(new Doctor("DOC001", "NMS001", "Dr. Rajesh Kumar", "password123", "General Medicine", "Kerala Medical College"));
            doctorRepository.save(new Doctor("DOC002", "NMS002", "Dr. Priya Nair", "password123", "Pediatrics", "Trivandrum Hospital"));
        }
    }
}