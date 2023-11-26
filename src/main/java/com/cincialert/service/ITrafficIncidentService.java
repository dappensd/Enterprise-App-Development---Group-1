package com.cincialert.service;

import com.cincialert.dto.TrafficIncident;

import java.util.List;

public interface ITrafficIncidentService {
    void save(TrafficIncident incident) throws Exception;
    List<TrafficIncident> fetchAll();
    TrafficIncident fetchById(int id);
    void deleteById(int id) throws Exception;
}
