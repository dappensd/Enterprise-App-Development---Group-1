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
1. As a new user I want to create an account so, I can save frequently used routes.
   - **Given**: I am on the login screen.
   - **When**: I select a new user and enter my registration data such as email and password.
   - **Then**: I should have access to the application.
   - **Given**: I am on login screen.
   - **When**: I input my account login credentials
   - **Then**: I should be logged into the application.
   - **Given**: I am at the application main screen.
   - **When**: I select my profile.
   - **Then**: I should be able to update my information.

 2. As a registered user I want to allow notifications so, I can be notified of recent traffic incidents in my area.
    - **Given**: I’ve allowed application notifications on my device.
    - **When**: a new accident or traffic backup happens.
    - **Then**: I should receive a notification on my device home screen.
    - **Given**: I am using the application to map out my route.
    - **When**: a shorter route is calculated
    - **Then**: I should receive a notification that a shorter route is available.
    
3. As a registered user I want to allow locations services so I can view a map and plan a route to my destination.
   - **Given**: I am at the application main screen.
   - **When**: I touch and drag the map.
   - **Then**: the map should move and generate.
   - **Given**: I am at the application main screen.
   - **When**: I select a location.
   - **Then**: I should be able to plan a route from my location.

  4. As a registered user I want to see active incident reports so I know what routes to avoid while planning a route.
     - **Given**: I am at the application main screen.
     - **When**: I select the Current incidents button.
     - **Then**: a list of current incidents should be opened.
     - **Given**: I am at the application main screen.
     - **When**: I select the report accident button.
     - **Then**: I should be able to input the location and time of an accident to be uploaded.

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

