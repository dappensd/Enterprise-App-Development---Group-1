package com.cincialert.service;


import com.cincialert.dao.ITrafficIncidentDAO;
import com.cincialert.dto.TrafficIncident;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrafficIncidentService implements ITrafficIncidentService {
    @Autowired
    private ITrafficIncidentDAO trafficIncidentDAO;

    public TrafficIncidentService(){}
    public TrafficIncidentService(ITrafficIncidentDAO trafficIncidentDAO) {

        this.trafficIncidentDAO = trafficIncidentDAO;
    }
    @Override
    public TrafficIncident saveIncident(TrafficIncident incident) throws Exception {
        return trafficIncidentDAO.saveIncident(incident);
    }
    @Override
    public List<TrafficIncident> getIncidents() {
        return trafficIncidentDAO.getIncidents();
    }
    @Override
    public TrafficIncident getIncidentById(int id) {
        return trafficIncidentDAO.getIncidentById(id);
    }
    @Override
    public void removeIncidentById(int id) throws Exception {
        trafficIncidentDAO.removeIncidentById(id);
    }
}
