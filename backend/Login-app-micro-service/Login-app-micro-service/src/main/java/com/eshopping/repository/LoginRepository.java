package com.eshopping.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eshopping.entity.Login;

public interface LoginRepository extends JpaRepository<Login, Long> {
	Optional<Login> findByEmailid(String emailid);

	boolean existsByEmailid(String emailid);
}
