package com.cincialert.cincialert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The CinciAlertApplication class is the main entry point for the CinciAlert application.
 * It initializes and starts the Spring Boot application.
 *
 * This class is annotated with {@code @SpringBootApplication}, which indicates that it's a Spring Boot
 * application and includes all the necessary configuration and setup.

 * @author [Insert Name]
 * @version 1.0
 * @since [Date]
 */
@SpringBootApplication
public class CinciAlertApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinciAlertApplication.class, args);
	}

}
