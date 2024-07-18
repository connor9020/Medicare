package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AdminMicroServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdminMicroServiceApplication.class, args);
        System.err.println("Admin microservice up on port number 8083");
    }

}

