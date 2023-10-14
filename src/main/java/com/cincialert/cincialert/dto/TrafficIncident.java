package com.cincialert.cincialert.dto;

import lombok.Data;

@Data
public class TrafficIncident {

    /**
     * The incident's ID.
     */
    private String incidentId;

    /**
     * The incident's location.
     */
    private Location location;

    /**
     * The incident's description.
     */
    private String description;

    /**
     * The incident's severity.
     */
    private String severity;

}
