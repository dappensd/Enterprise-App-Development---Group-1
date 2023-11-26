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
    public TrafficIncidentService(ITrafficIncidentDAO trafficIncidentDAO) {this.trafficIncidentDAO = trafficIncidentDAO;}
    @Override
    public void save(TrafficIncident incident) throws Exception {trafficIncidentDAO.save(incident);}
    @Override
    public List<TrafficIncident> fetchAll() {
        return trafficIncidentDAO.fetchAll();
    }
    @Override
    public TrafficIncident fetchById(int id) {
        return trafficIncidentDAO.fetchById(id);
    }
    @Override
    public void deleteById(int id) throws Exception {
        trafficIncidentDAO.deleteById(id);
    }
}
