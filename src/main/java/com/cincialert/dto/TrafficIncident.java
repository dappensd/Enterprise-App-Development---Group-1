package com.cincialert.dto;

import lombok.Data;

import java.util.List;

public class TrafficIncident {
    private String incidentID;
    private double latitude;
    private double longitude;
    private String description;
    private String severity;

    public TrafficIncident(String incidentID, double latitude, double longitude, String description, String severity) {
        this.incidentID = incidentID;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.severity = severity;
    }

    public String getDescription() {
        return description;
    }

}
