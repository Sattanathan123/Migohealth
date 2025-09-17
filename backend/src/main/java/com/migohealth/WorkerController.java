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
    
    @GetMapping("/{healthId}")
    public ResponseEntity<Worker> getWorkerByHealthId(@PathVariable String healthId) {
        Optional<Worker> worker = workerService.getWorkerByHealthId(healthId);
        return worker.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/register")
    public ResponseEntity<Worker> registerWorker(@RequestBody WorkerRegistrationRequest request) {
        Worker worker = workerService.registerWorker(request);
        return ResponseEntity.ok(worker);
    }
}