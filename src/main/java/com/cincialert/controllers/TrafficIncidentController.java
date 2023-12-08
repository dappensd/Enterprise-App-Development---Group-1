package com.cincialert.controllers;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.service.ITrafficIncidentService;
import com.cincialert.utils.MapInfo;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;

import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class TrafficIncidentController {

    @Autowired
    ITrafficIncidentService incidentService;

    @RequestMapping("/submitIncident")
    public String sendReportPage(Model model)  {

        model.addAttribute(new TrafficIncident(39.2, -85.0));
        return "traffic-report-send";
    }

    @RequestMapping("/createReport")
    public ResponseEntity createReport(TrafficIncident report) {
        try {
            GeoApiContext context = new GeoApiContext.Builder()
                    .apiKey("AIzaSyCoVLMMQ_OgyrsklHvh9L6-x8hvyC_fspk")
                    .build();


            LatLng reportCoords = new LatLng(report.getLatitude(), report.getLongitude());
            GeocodingResult[] results = GeocodingApi.reverseGeocode(context, reportCoords).await();

            boolean isReportWithinCincy = MapInfo.isCoordinateWithinCincy(reportCoords);
            boolean isTooFarFromStreet = MapInfo.isCoordinateTooFarFromStreet(results, new LatLng(report.getLatitude(), report.getLongitude()));
            boolean isReportNearIncident = MapInfo.isReportIncidentNearOtherIncident(reportCoords, incidentService.fetchAll());

            if (isReportWithinCincy && !isTooFarFromStreet && !isReportNearIncident){
                incidentService.save(report);

            }else{
                // TODO: Add logic to send sms or email to user that the traffic submission not valid
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/")
    public String homePage(Model model) {
        List<TrafficIncident> trafficIncidents = incidentService.fetchAll();
        model.addAttribute("trafficIncidents", trafficIncidents);

        return "cincialert-home";
    }

    @GetMapping("/trafficIncidentsJson")
    @ResponseBody
    public List<TrafficIncident> trafficIncidentList() {
        return incidentService.fetchAll();
    }

}
