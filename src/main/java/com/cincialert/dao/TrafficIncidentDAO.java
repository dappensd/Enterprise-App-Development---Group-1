package com.cincialert.dao;

import com.cincialert.dto.TrafficIncident;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TrafficIncidentDAO implements ITrafficIncidentDAO {
    private Map<Integer, TrafficIncident> incidents = new HashMap<>();
    @Override
    public TrafficIncident saveIncident(TrafficIncident incident) throws Exception {
        Integer id = incident.getIncidentID();
        incidents.put(id, incident);
        return incident;
    }
    @Override
    public List<TrafficIncident> getIncidents() {
        return new ArrayList(incidents.values());
    }
    @Override
    public TrafficIncident getIncidentById(int id) {
        return incidents.get(id);
    }
    @Override
    public void removeIncidentById(int id) throws Exception {
        incidents.remove(id);
    }
}