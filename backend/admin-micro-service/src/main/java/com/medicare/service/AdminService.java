package com.medicare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.medicare.entity.Product;

import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private RestTemplate restTemplate;

    private final String PRODUCT_SERVICE_URL = "http://localhost:8080/products";

    public List<Product> getAllProducts() {
        Product[] products = restTemplate.getForObject(PRODUCT_SERVICE_URL, Product[].class);
        return Arrays.asList(products);
    }

    public Product addProduct(Product product) {
        return restTemplate.postForObject(PRODUCT_SERVICE_URL, product, Product.class);
    }

    public Product updateProduct(Long id, Product product) {
        restTemplate.put(PRODUCT_SERVICE_URL + "/" + id, product);
        return getProductById(id);
    }

    public void deleteProduct(Long id) {
        restTemplate.delete(PRODUCT_SERVICE_URL + "/" + id);
    }

    public Product getProductById(Long id) {
        return restTemplate.getForObject(PRODUCT_SERVICE_URL + "/" + id, Product.class);
    }

    public Product updateProductPrice(Long id, Double price) {
        String url = PRODUCT_SERVICE_URL + "/" + id + "/price?price=" + price;
        restTemplate.put(url, null);
        return getProductById(id);
    }
}
