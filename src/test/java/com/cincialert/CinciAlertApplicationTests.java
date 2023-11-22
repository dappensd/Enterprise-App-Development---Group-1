//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.cincialert;

import java.util.ArrayList;

import com.cincialert.dto.TrafficIncident;
import com.cincialert.dto.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CinciAlertApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void verifyTrafficIncidentProperties() {
        int IncidentID = 1;
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

    @Test
    void verifyUserProperties(){
        String username = "test";
        String email = "test@uc.edu";
        String password = "Test1234";
        String description = "i am user :)";
        User testUser = new User(username, email, password);

        Assertions.assertEquals(username, testUser.getUsername());

        Assertions.assertEquals(email, testUser.getEmail());
        
        Assertions.assertEquals(password, testUser.getPassword());

        testUser.setDescription(description);
        Assertions.assertEquals(description, testUser.getDescription());
    }
}
