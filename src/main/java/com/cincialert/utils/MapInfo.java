package com.cincialert.utils;

import com.cincialert.dto.TrafficIncident;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;

import java.util.List;

public class MapInfo {
    public static boolean isCoordinateWithinCincy(LatLng position) {

        final double minLatitude = 39.0295;
        final double maxLatitude = 39.23;
        final double minLongitude = -84.73;
        final double maxLongitude = -84.35;

        return (position.lat >= minLatitude
                && position.lat <= maxLatitude
                && position.lng >= minLongitude
                && position.lng <= maxLongitude);
    }

    public static double getDistanceBetweenPoints(LatLng point1, LatLng point2) {
        final double radius = 6371;

        double lat1Rad = Math.toRadians(point1.lat);
        double lat2Rad = Math.toRadians(point2.lat);
        double lon1Rad = Math.toRadians(point1.lng);
        double lon2Rad = Math.toRadians(point2.lng);

        double x = (lon2Rad - lon1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
        double y = (lat2Rad - lat1Rad);

        double distance = Math.sqrt(x * x + y * y) * radius * 1000;

        return distance;
    }

    public static boolean isReportIncidentNearOtherIncident(LatLng reportedIncidentLatLng, List<TrafficIncident> incidents){
        final double maxIncidentOffset = 20;

        for (var incident : incidents){
            LatLng incidentCoordinate = new LatLng(incident.getLatitude(), incident.getLongitude());

            if (MapInfo.getDistanceBetweenPoints(incidentCoordinate, reportedIncidentLatLng) < maxIncidentOffset){
                return true;
            }
        }
        return false;
    }

    public static boolean isCoordinateTooFarFromStreet(GeocodingResult[] results, LatLng reportLatLng){
        double shortestDistance = Double.MAX_VALUE;

        for (var result :  results){
            boolean isStreetType = (result.types[0].toString().equals("street_address")
                    || result.types[0].toString().equals("intersection")
                    || result.types[0].toString().equals("route")
                    || result.types[0].toString().equals("establishment"));

            double distance = MapInfo.getDistanceBetweenPoints(result.geometry.location, reportLatLng);

            boolean isCloseToStreet =  distance < shortestDistance;

            if (isCloseToStreet && isStreetType){
                shortestDistance = distance;
            }
        }

        final double markerOffset = 30;
        return shortestDistance > markerOffset;
    }





}
