package com.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.medicare.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
