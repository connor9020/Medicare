package com.eshopping.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eshopping.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {
	Optional<Login> findByEmailid(String emailid);

	boolean existsByEmailid(String emailid);
}
