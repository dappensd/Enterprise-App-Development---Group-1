package com.cincialert.repository;

import com.cincialert.dto.TrafficIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrafficIncidentRepository extends JpaRepository<TrafficIncident, Long> {
}
