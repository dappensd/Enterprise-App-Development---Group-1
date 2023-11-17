package com.cincialert.cincialert;

import com.cincialert.cincialert.dto.TrafficIncident;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class CinciAlertApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void verifyTrafficIncidentProperties(){
		int IncidentID = 1;
		List<String> Location = new ArrayList<String>();
		String Description = "1";
		String Severity = "1";

		//Create new TrafficIncident
		TrafficIncident trafficIncident = new TrafficIncident();

		//set & assert IncidentID
		trafficIncident.setIncidentID(IncidentID);
		assertEquals(IncidentID, trafficIncident.getIncidentID());

		// TODO Add Location test condition

		//set & assert Description
		trafficIncident.setDescription(Description);
		assertEquals(Description, trafficIncident.getDescription());

		//set & assert Severity
		trafficIncident.setSeverity(Severity);
		assertEquals(Severity, trafficIncident.getSeverity());
	}
}
