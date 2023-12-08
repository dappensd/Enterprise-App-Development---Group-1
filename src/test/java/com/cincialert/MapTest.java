package com.cincialert;

import com.cincialert.utils.MapInfo;
import com.google.maps.model.LatLng;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
public class MapTest {

    @Test
    void isCoordinateWithinCincy() {
        LatLng withinCincy = new LatLng(39.15, -84.5);
        LatLng outsideCincy = new LatLng(40.0, -85.0);

        assertTrue(MapInfo.isCoordinateWithinCincy(withinCincy));
        assertFalse(MapInfo.isCoordinateWithinCincy(outsideCincy));
    }
}
