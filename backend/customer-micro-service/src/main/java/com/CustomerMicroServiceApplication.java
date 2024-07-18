package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CustomerMicroServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerMicroServiceApplication.class, args);
        System.err.println("Customer Microservice is running at port 8082");
    }
}

