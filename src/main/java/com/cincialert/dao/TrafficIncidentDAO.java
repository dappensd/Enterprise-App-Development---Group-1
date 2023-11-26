package com.cincialert.dao;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.repository.TrafficIncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TrafficIncidentDAO implements ITrafficIncidentDAO {

    @Autowired
    TrafficIncidentRepository trafficIncidentRepository;
    @Override
    public void save(TrafficIncident trafficIncident) throws Exception {
        trafficIncidentRepository.save(trafficIncident);
    }
    @Override
    public List<TrafficIncident> fetchAll() {
        return trafficIncidentRepository.findAll();
    }
    @Override
    public TrafficIncident fetchById(int id) {
        return trafficIncidentRepository.findById(id).get();
    }
    @Override
    public void deleteById(int id) throws Exception {
        trafficIncidentRepository.deleteById(id);
    }
}