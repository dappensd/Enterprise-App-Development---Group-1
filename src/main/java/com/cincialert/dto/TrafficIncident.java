package com.cincialert.dto;

import lombok.Data;

import java.util.List;

@Data
public class TrafficIncident {
    private int incidentID;
    private double latitude;
    private double longitude;
    private String description;
    private String severity;

    public TrafficIncident() {}
    public TrafficIncident(int incidentID, double latitude, double longitude, String description, String severity) {
        this.incidentID = incidentID;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.severity = severity;
    }



}
