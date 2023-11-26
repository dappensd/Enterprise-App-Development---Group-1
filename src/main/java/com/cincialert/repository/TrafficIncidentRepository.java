package com.cincialert.repository;

import com.cincialert.dto.TrafficIncident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficIncidentRepository extends JpaRepository<TrafficIncident, Integer> {

}
