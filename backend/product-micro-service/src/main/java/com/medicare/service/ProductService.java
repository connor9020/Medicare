package com.medicare.service;

import com.medicare.entity.Product;
import com.medicare.repository.ProductRepository;
import com.medicare.entity.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    
    //connects to order microservice
    @Autowired
    private RestTemplate restTemplate;
    private final String ORDER_SERVICE_URL = "http://localhost:8081/orders"; 

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    //additional checks
    public void updateStockAndLogOrder(Long productId, Long cid, int quantity, double totalPrice) {
        System.out.println("Processing productId: " + productId);
        if (productId == null) {
            throw new IllegalArgumentException("Product ID must not be null");
        }

        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        System.out.println("Product found: " + product.getName());
        System.out.println("Current stock: " + product.getStock());

        // Updates the product stock
        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock for product: " + productId);
        }
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);

        System.out.println("Updated stock: " + product.getStock());

        // Creates and sends the order request to the OrderService
        OrderRequest orderRequest = new OrderRequest(productId, cid, quantity, totalPrice);
        restTemplate.postForObject(ORDER_SERVICE_URL, orderRequest, OrderRequest.class);

        System.out.println("Order request sent: " + orderRequest);
    }
  
    
}

