# Enterprise-App-Development---Group-1

# Introduction
Introducing "CinciAlert" – your essential app for staying informed about traffic incidents and disruptions in the Cincinnati area. With CinciTraffic Alert, you can:

Navigate Cincinnati with confidence by receiving real-time alerts about traffic accidents, road closures, and other hindrances to your journey.

Access a comprehensive database of traffic benchmarks, sourced from local authorities and transportation agencies, to provide you with reference points for planning your routes.

Experience an efficient and stress-free commute as you make informed decisions based on up-to-the-minute traffic information.

Explore CinciAlert today and take control of your Cincinnati commute like never before!

# Storyboard
[//]: # (insert image file here)

# Functional Requirements
[//]: # (insert text here)

# UML Diagram
![UML Diagram](https://github.com/dappensd/Enterprise-App-Development---Group-1/assets/60232895/f87807f3-80a7-4078-a0f3-5aaf021c9f8a)

# JSON Schema
The following JSON's are anticipating the structure of the data and may not be used in endpoints.

### cinciAlertApp:

```json
{
    "type": "object",
    "properties": {
        "userSettings": {
            "type": "object",
            "properties": {
                "username": { "type": "string" },
                "notificationPreferences": {
                    "type": "object",
                    "properties": {
                        "emailNotifications": { "type": "boolean" },
                        "pushNotifications": { "type": "boolean" },
                        "smsNotifications": { "type": "boolean" }
                    },
                    "required": ["emailNotifications", "pushNotifications", "smsNotifications"]
                }
            },
            "required": ["username", "notificationPreferences"]
        },
        "trafficIncident": {
            "type": "object",
            "properties": {
                "incidentID": { "type": "string" },
                "location": { "type": "object", "properties": { "latitude": { "type": "number" }, "longitude": { "type": "number" } }, "required": ["latitude", "longitude"] },
                "description": { "type": "string" },
                "severity": { "type": "string" }
            },
            "required": ["incidentID", "location", "description", "severity"]
        },
        "trafficAlertManager": {
            "type": "object",
            "properties": {
                "incidentList": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "incidentID": { "type": "string" },
                            "location": { "type": "object", "properties": { "latitude": { "type": "number" }, "longitude": { "type": "number" } }, "required": ["latitude", "longitude"] },
                            "description": { "type": "string" },
                            "severity": { "type": "string" }
                        },
                        "required": ["incidentID", "location", "description", "severity"]
                    }
                }
            },
            "required": ["incidentList"]
        }
    },
    "required": ["userSettings", "trafficIncident", "trafficAlertManager"]
}
```

### userSettings:

```json
{
    "type": "object",
    "properties": {
        "username": {
            "type": "string",
            "description": "Username of the user"
        },
        "notificationPreferences": {
            "type": "object",
            "properties": {
                "emailNotifications": {
                    "type": "boolean",
                    "description": "Description for email notifications"
                },
                "pushNotifications": {
                    "type": "boolean",
                    "description": "Description for push notifications"
                },
                "smsNotifications": {
                    "type": "boolean",
                    "description": "Description for SMS notifications"
                }
            },
            "required": ["emailNotifications", "pushNotifications", "smsNotifications"]
        }
    },
    "required": ["username", "notificationPreferences"]
}
```

### trafficIncident:

```json
{
    "type": "object",
    "properties": {
        "incidentID": {
            "type": "string",
            "description": "Unique ID for the incident"
        },
        "location": {
            "type": "object",
            "properties": {
                "latitude": {
                    "type": "number",
                    "description": "Latitude of the location"
                },
                "longitude": {
                    "type": "number",
                    "description": "Longitude of the location"
                }
            },
            "required": ["latitude", "longitude"]
        },
        "description": {
            "type": "string",
            "description": "Details about the incident"
        },
        "severity": {
            "type": "string",
            "description": "Severity level of the incident"
        }
    },
    "required": ["incidentID", "location", "description", "severity"]
}
```

### trafficAlertManager:

```json
{
    "type": "object",
    "properties": {
        "incidentList": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "incidentID": { "type": "string" },
                    "location": { "type": "object", "properties": { "latitude": { "type": "number" }, "longitude": { "type": "number" } }, "required": ["latitude", "longitude"] },
                    "description": { "type": "string" },
                    "severity": { "type": "string" }
                },
                "required": ["incidentID", "location", "description", "severity"]
            },
            "description": "List of traffic incidents"
        }
    },
    "required": ["incidentList"]
}
```


# Scrum Roles
- Product Owner: Sam Dappen
- Scrum Master: David Toran
- Development Team: William Bohman and Carson Simms

# Weekly Team Meetings
The CinciAlert team will meet every Sunday night on Microsoft Teams.

