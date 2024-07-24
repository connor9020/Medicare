package com.eshopping.service;

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
		if (loginRepository.existsByEmailid(login.getEmailid())) {
			return "Emailid must be unique";
		} else if (login.getTypeofuser().equals("admin")) {
			return "You can't create admin account";
		} else {
			loginRepository.save(login);
			return "Account created successfully";
		}
	}

	public String signIn(Login login) {
		Optional<Login> result = loginRepository.findByEmailid(login.getEmailid());
		if (result.isPresent()) {
			Login ll = result.get();
			logger.info("Found user with email: {}", login.getEmailid());
			if (ll.getPassword().equals(login.getPassword())) {
				logger.info("Password matches for user with email: {}", login.getEmailid());
				if (ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("admin")) {
					return "Admin login successfully";
				} else if (ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("customer")) {
					return "Customer login successfully";
				} else {
					logger.warn("Invalid user type for user with email: {}", login.getEmailid());
					return "Type of user is invalid";
				}
			} else {
				logger.warn("Incorrect password for user with email: {}", login.getEmailid());
				return "Password is wrong";
			}
		} else {
			logger.warn("No user found with email: {}", login.getEmailid());
			return "Emailid is wrong";
		}
	}

}
