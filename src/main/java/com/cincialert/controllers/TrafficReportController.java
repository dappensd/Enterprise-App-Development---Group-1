package com.cincialert.controllers;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.service.ITrafficIncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TrafficReportController {

    @Autowired
    ITrafficIncidentService incidentService;

    @RequestMapping("/report")
    public String reportPage() {
        return "traffic-report-page";
    }

    @PostMapping(value="/report", consumes="application/json", produces="application/json")
    @ResponseBody
    public ResponseEntity createReport(@RequestBody TrafficIncident report) {
        try {
            incidentService.saveIncident(report);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception exception) {

            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // This was just used to test the post method

//    @GetMapping("/report")
//    @ResponseBody
//    public List<TrafficIncident> trafficIncidentList() {
//        return incidentService.getIncidents();
//    }

}
