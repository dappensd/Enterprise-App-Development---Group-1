package com.cincialert.cincialert;

import lombok.Data;

import java.util.List;

public @Data class TrafficIncident {
    private int IncidentID;
    private List<String> Location;
    private String Description;
    private String Severity;
}
