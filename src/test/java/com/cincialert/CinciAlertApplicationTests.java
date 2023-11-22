//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.cincialert;

import java.util.ArrayList;

import com.cincialert.dto.TrafficIncident;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CinciAlertApplicationTests {
    CinciAlertApplicationTests() {
    }

    @Test
    void contextLoads() {
    }

    @Test
    void verifyTrafficIncidentProperties() {
        int IncidentID = 1;
        new ArrayList();
        String Description = "1";
        String Severity = "1";
        TrafficIncident trafficIncident = new TrafficIncident();
        trafficIncident.setIncidentID(IncidentID);
        Assertions.assertEquals(IncidentID, trafficIncident.getIncidentID());
        trafficIncident.setDescription(Description);
        Assertions.assertEquals(Description, trafficIncident.getDescription());
        trafficIncident.setSeverity(Severity);
        Assertions.assertEquals(Severity, trafficIncident.getSeverity());
    }
}
