package com.eshopping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.eshopping.entity.Login;
import com.eshopping.entity.UpdateBalanceRequest;
import com.eshopping.service.LoginService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin // allow to access my rest api for all url for all methods.
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping(value = "/signin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> signIn(@RequestBody Login login) {
        return loginService.signIn(login);
    }

    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String signUp(@RequestBody Login login) {
        return loginService.signUp(login);
    }
    
    @PutMapping("/updateBalance")
    public ResponseEntity<Map<String, String>> updateBalance(@RequestBody Login login) {
        boolean isUpdated = loginService.updateBalance(login.getCid(), login.getBalance());
        Map<String, String> response = new HashMap<>();
        if (isUpdated) {
            response.put("message", "Balance updated successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to update balance");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

