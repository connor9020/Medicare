# Medicare Capstone Project

## Overview
The Medicare Capstone Project is a comprehensive application designed to demonstrate proficiency in working with microservices. The project is built using Spring Boot for backend microservices and Angular for the frontend. It encompasses various functionalities such as user authentication, product management, order processing, and profile management, all integrated seamlessly through a microservices architecture.

## Features
- **User Authentication**: Users and admins can sign up and log in.
- **Product Management**: Admins can add, update, delete, and view products. Admins can see all customer orders and see a sample of the customer homepage.
- **Order Processing**: Users can add products to the cart, place orders, and view order history. These purchases also withdraws money from their preloaded account.
- **Profile Management**: Users can view and update their profile information and account balance.
- **Microservices Architecture**: The project uses multiple microservices for handling different functionalities, ensuring modularity and scalability.

## Technologies Used
- **Backend**: 
  - Spring Boot
  - Spring Data JPA
  - MySQL
  - Eureka (Service Discovery)
- **Frontend**:
  - Angular
  - Bootstrap
- **Other Tools**:
  - Postman (API testing)
  - MySQL Workbench

## Microservices
### Login Microservice
Handles user authentication and profile management.
- **Endpoints**:
  - `POST /login/signup`: Sign up a new user.
  - `POST /login/signin`: Sign in an existing user.
  - `PUT /login/updateBalance`: Update user balance.

### Order Microservice
Manages order processing and order history.
- **Endpoints**:
  - `POST /orders`: Create a new order.
  - `GET /orders/{id}`: Get order by ID.
  - `GET /orders/customer?Cid={cid}`: Get orders by customer ID.
  - `GET /orders/all`: Get all orders.

### Product Microservice
Handles product management.
- **Endpoints**:
  - `POST /products`: Add a new product.
  - `PUT /products/{id}`: Update an existing product.
  - `DELETE /products/{id}`: Delete a product.
  - `GET /products`: Get all products.
  - `GET /products/type/{type}`: Get products by type.

## Setup Instructions
### Prerequisites
- Java 17
- Node.js
- Angular CLI
- MySQL

### Backend
1. Clone the repository:
   git clone https://github.com/your-username/medicare-capstone.git
   cd medicare-capstone
2. Navigate to each microservice directory and build the projects:
    cd login-microservice
    mvn clean install
    cd ../order-microservice
    mvn clean install
    cd ../product-microservice
    mvn clean install
3. Update the application.properties file in each microservice to match your MySQL configuration:
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database
    spring.datasource.username=root
    spring.datasource.password=root123
4. Run each microservice:

### Frontend

1. Navigate to the frontend directory:
     cd frontend/shopping-frontend-app
2. Install dependencies
     npm install
3. Run the Angular development server:
     ng serve

# Testing

Use Postman to test API endpoints.
Access the frontend application at http://localhost:4200.

# Known Issues

Ensure all microservices are running before accessing the frontend.
Make sure the Eureka server is up and running to avoid service discovery issues.

# Contributions

Contributions are welcome! Please create a pull request or open an issue to discuss improvements or bug fixes. This is my first Full-Stack Project and I'm happy to learn!

   
