package com.migohealth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface HospitalStaffRepository extends JpaRepository<HospitalStaff, Long> {
    Optional<HospitalStaff> findByStaffId(String staffId);
}