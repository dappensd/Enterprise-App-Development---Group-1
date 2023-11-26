package com.cincialert.dao;

import com.cincialert.dto.TrafficIncident;

import java.util.List;

public interface ITrafficIncidentDAO {
    void save(TrafficIncident incident) throws Exception;
    List<TrafficIncident> fetchAll();
    TrafficIncident fetchById(int id);
    void deleteById(int id) throws Exception;
}
