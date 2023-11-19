package com.cincialert.repository;

import com.cincialert.dto.TrafficIncident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficIncidentRepository extends JpaRepository<TrafficIncident, Long> {
    // You can add custom query methods if needed
}
