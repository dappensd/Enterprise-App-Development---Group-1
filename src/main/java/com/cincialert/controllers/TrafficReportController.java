package com.cincialert.controllers;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.service.ITrafficIncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TrafficReportController {

    @Autowired
    ITrafficIncidentService incidentService;
    @RequestMapping("/submitIncident")
    public String sendReportPage(Model model) {

        // Included so html page can resolve traffic incident attributes
        model.addAttribute(new TrafficIncident());
        return "traffic-report-send";
    }

    @RequestMapping("/recieveIncident")
    public String recieveReportPage() {
        return "traffic-report-recieve";
    }

    @RequestMapping("/createReport")
    public ResponseEntity createReport(TrafficIncident report) {
        try {
            incidentService.saveIncident(report);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/retrieveReports")
    @ResponseBody
    public List<TrafficIncident> trafficIncidentList() {
        return incidentService.getIncidents();
    }

}
