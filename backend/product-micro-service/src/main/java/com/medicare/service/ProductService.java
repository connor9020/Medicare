package com.medicare.service;

import com.medicare.entity.Product;
import com.medicare.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.getReferenceById(id);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    
	public Product updateProductStock(Long productId, int quantity) {
		Product product = getProductById(productId);
		product.setStockFromPurchase(quantity);
        return updateProduct(product);
    }

}
