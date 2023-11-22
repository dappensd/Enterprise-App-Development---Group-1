package com.cincialert;

import java.util.List;
import com.cincialert.dto.TrafficIncident;
import com.cincialert.dto.User;

public class TrafficAlertManager {
    private List<TrafficIncident> incidentList;

    public TrafficAlertManager(List<TrafficIncident> incidentList) {
        this.incidentList = incidentList;
    }

    public void reportIncident(TrafficIncident incident) {
        incidentList.add(incident);
        notifyUsers(incident);
    }

    public List<TrafficIncident> getIncidentList() {
        return incidentList;
    }

    private void notifyUsers(TrafficIncident incident) {
        NotificationManager notificationManager = new NotificationManager();

        for (User user : getUsersToNotify()) {
            notificationManager.sendNotification(user, "Traffic incident reported: " + incident.getDescription());
        }
    }

    private List<User> getUsersToNotify() {
        return List.of(new User("user1", "user1@example.com", "password1"),
                new User("user2", "user2@example.com", "password2"));
    }
}



