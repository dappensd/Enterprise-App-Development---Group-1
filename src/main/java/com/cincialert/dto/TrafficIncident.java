package com.cincialert.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class TrafficIncident {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
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
