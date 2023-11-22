package com.cincialert;

import com.cincialert.dto.User;

public class NotificationManager {
    public void sendNotification(User user, String message) {
        // Implement notification sending logic based on user preferences
        if (user.isEmailNotifications()) {
            // Implement email notification logic
            System.out.println("Sending email notification to " + user.getEmail() + ": " + message);
        }
        if (user.isPushNotifications()) {
            // Implement push notification logic
            System.out.println("Sending push notification to " + user.getUsername() + ": " + message);
        }
        if (user.isSmsNotifications()) {
            // Implement SMS notification logic
            System.out.println("Sending SMS notification to " + user.getUsername() + ": " + message);
        }
    }

}

