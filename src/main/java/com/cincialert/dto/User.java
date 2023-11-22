package com.cincialert.dto;

import com.cincialert.NotificationManager;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ACCOUNTS")
@Getter
@Setter
@NoArgsConstructor
public @Data class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    private String description;

    private boolean emailNotifications;
    private boolean pushNotifications;
    private boolean smsNotifications;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.emailNotifications = true; // Default to true for simplicity
        this.pushNotifications = true;
        this.smsNotifications = true;
    }

    // Getter and setter methods

    public boolean register() {
        // Implement user registration logic
        // For simplicity, let's assume successful registration every time
        return true;
    }

    public boolean login(String enteredUsername, String enteredPassword) {
        // Implement user login logic
        return username.equals(enteredUsername) && password.equals(enteredPassword);
    }

    public void updateProfile(boolean emailNotifications, boolean pushNotifications, boolean smsNotifications) {
        // Implement profile update logic
        this.emailNotifications = emailNotifications;
        this.pushNotifications = pushNotifications;
        this.smsNotifications = smsNotifications;
    }

    // Notification-related methods
    public void enableEmailNotifications() {
        emailNotifications = true;
    }

    public void disableEmailNotifications() {
        emailNotifications = false;
    }

    public void enablePushNotifications() {
        pushNotifications = true;
    }

    public void disablePushNotifications() {
        pushNotifications = false;
    }

    public void enableSmsNotifications() {
        smsNotifications = true;
    }

    public void disableSmsNotifications() {
        smsNotifications = false;
    }

    public void sendNotification(String message) {
        NotificationManager notificationManager = new NotificationManager();
        notificationManager.sendNotification(this, message);
    }
}

