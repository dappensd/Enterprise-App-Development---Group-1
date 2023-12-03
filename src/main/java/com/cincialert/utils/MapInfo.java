package com.cincialert.utils;

import com.google.maps.model.LatLng;

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


}
