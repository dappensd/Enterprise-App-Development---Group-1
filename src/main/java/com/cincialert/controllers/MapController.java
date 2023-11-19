package com.cincialert.controllers;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.repository.TrafficIncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MapController {

    @Autowired
    private TrafficIncidentRepository trafficIncidentRepository;

    @GetMapping("/mapview")
    public String showMap(Model model) {
        List<TrafficIncident> trafficIncidents = trafficIncidentRepository.findAll();
        model.addAttribute("trafficIncidents", trafficIncidents);
        return "mapview";
    }
}



