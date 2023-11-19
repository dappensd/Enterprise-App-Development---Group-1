package com.cincialert.dao;

import com.cincialert.dto.TrafficIncident;

import java.util.List;

public interface ITrafficIncidentDAO {
    TrafficIncident saveIncident(TrafficIncident incident) throws Exception;
    List<TrafficIncident> getIncidents();
    TrafficIncident getIncidentById(int id);
    void removeIncidentById(int id) throws Exception;
}
