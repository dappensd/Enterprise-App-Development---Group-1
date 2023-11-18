package com.cincialert;
import com.google.maps.GeoApiContext;
import com.google.maps.DirectionsApi;
import com.google.maps.model.DirectionsLeg;
import com.google.maps.model.DirectionsResult;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;

public class MapGeneration extends Application {
    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Map Application");

        // Create the map view
        BorderPane root = new BorderPane();
        // Add your map-related components to the root (e.g., WebView for Google Maps API)

        Scene scene = new Scene(root, 800, 600);
        primaryStage.setScene(scene);

        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
