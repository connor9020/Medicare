package com.medicare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.medicare.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}