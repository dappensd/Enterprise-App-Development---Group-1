package com.cincialert;

import com.cincialert.dto.TrafficIncident;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class CinciAlertApplicationTest {

    @Autowired
    private ApplicationContext ctx;

    @Test
    public void contextLoads() {
        assert(ctx != null);
    }
    @Test
    public void testNoArgConstructor() {
        TrafficIncident incident = new TrafficIncident();
        assertNotNull(incident);
    }

    @Test
    public void testAllArgConstructor() {
        TrafficIncident incident = new TrafficIncident(1, 40.7128, 74.0060, "Test Description", "High");
        assertNotNull(incident);
        assertEquals(1, incident.getIncidentID());
        assertEquals(40.7128, incident.getLatitude());
        assertEquals(74.0060, incident.getLongitude());
        assertEquals("Test Description", incident.getDescription());
        assertEquals("High", incident.getSeverity());
    }

    @Test
    public void testSettersAndGetters() {
        TrafficIncident incident = new TrafficIncident();
        incident.setIncidentID(2);
        incident.setLatitude(51.5074);
        incident.setLongitude(0.1278);
        incident.setDescription("Test Description 2");
        incident.setSeverity("Low");

        assertEquals(2, incident.getIncidentID());
        assertEquals(51.5074, incident.getLatitude());
        assertEquals(0.1278, incident.getLongitude());
        assertEquals("Test Description 2", incident.getDescription());
        assertEquals("Low", incident.getSeverity());
    }
}