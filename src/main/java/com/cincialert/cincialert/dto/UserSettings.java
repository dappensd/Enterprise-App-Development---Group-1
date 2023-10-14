package com.cincialert.cincialert.dto;

import lombok.Data;

@Data
public class UserSettings {

    /**
     * Whether the user wants to receive email notifications.
     */
    private boolean emailNotifications;

    /**
     * Whether the user wants to receive push notifications.
     */
    private boolean pushNotifications;

    /**
     * Whether the user wants to receive SMS notifications.
     */
    private boolean smsNotifications;

}
