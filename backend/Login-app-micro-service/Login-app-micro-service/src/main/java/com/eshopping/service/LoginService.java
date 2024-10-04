package com.eshopping.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eshopping.entity.Login;
import com.eshopping.repository.LoginRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LoginService {

    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    @Autowired
    LoginRepository loginRepository;

    public String signUp(Login login) {
        try {
            if (loginRepository.existsByEmailid(login.getEmailid())) {
                return "Emailid must be unique";
            } else if (login.getTypeofuser().equals("admin")) {
                return "You can't create admin account";
            } else {
                loginRepository.save(login);
                return "Account created successfully";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Internal Server Error: " + e.getMessage();
        }
    }

    public Map<String, Object> signIn(Login login) { // method returns map with string keys - object values
        Map<String, Object> response = new HashMap<>();
        Optional<Login> result = loginRepository.findByEmailid(login.getEmailid());
        if (result.isPresent()) { // when users email is found 
            Login ll = result.get();
            logger.info("Found user with email: {}", login.getEmailid());
            if (ll.getPassword().equals(login.getPassword())) {
                logger.info("Password matches for user with email: {}", login.getEmailid());
                response.put("cid", ll.getCid()); // if the password is correct, these lines populate the response map with customer's data
                response.put("emailid", ll.getEmailid());
                response.put("name", ll.getName());
                response.put("phone", ll.getPhone());
                response.put("balance", ll.getBalance());
                response.put("typeofuser", ll.getTypeofuser());
                if (ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("admin")) {
                    response.put("message", "Admin login successfully");
                } else if (ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("customer")) {
                    response.put("message", "Customer login successfully");
                } else {
                    logger.warn("Invalid user type for user with email: {}", login.getEmailid());
                    response.put("message", "Type of user is invalid");
                }
            } else {
                logger.warn("Incorrect password for user with email: {}", login.getEmailid());
                response.put("message", "Password is wrong");
            }
        } else {
            logger.warn("No user found with email: {}", login.getEmailid());
            response.put("message", "Emailid is wrong");
        }
        return response; 
        
    }
    
    public boolean updateBalance(Long cid, Double newBalance) { // returns t/f if balance was updated successfully
        Optional<Login> optionalLogin = loginRepository.findById(cid);
        if (optionalLogin.isPresent()) {
            Login login = optionalLogin.get();
            login.setBalance(newBalance);
            loginRepository.save(login); // if user is present, get login object from optional and setBalance to new balance value
            return true;
        } else {
            return false;
        }
    }
    

}

