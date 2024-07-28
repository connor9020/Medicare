package com.medicare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.medicare.entity.Product;
import com.medicare.service.ProductService;
import com.medicare.entity.StockUpdateRequest;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping
	public Product createProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}

	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		return productService.getProductById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
	}

	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
		product.setId(id);
		return productService.updateProduct(product);
	}
	
    @PostMapping("/update-stock-log-order")
    public void updateStockAndLogOrder(@RequestBody List<StockUpdateRequest> requests) {
        requests.forEach(request -> 
            productService.updateStockAndLogOrder(
                request.getProductId(),
                request.getCid(),
                request.getQuantity(),
                request.getTotalPrice()
            )
        );
    }
}
