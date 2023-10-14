package com.cincialert.cincialert.dto;

import lombok.Data;

@Data
public class User {

    /**
     * The user's username, unique.
     */
    private String username;

    /**
     * The users settings.
     */
    private UserSettings userSettings;

}
