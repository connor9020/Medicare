import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('addProductForm') addProductForm!: NgForm;
  @ViewChild('updateProductForm') updateProductForm!: NgForm;

  newProduct: Product = new Product();
  updateProduct: Product = new Product();
  products: Product[] = [];
  orders: Order[] = [];
  isProductManagement: boolean = true;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  showProductManagement(): void {
    this.isProductManagement = true;
  }

  showOrderTable(): void {
    this.isProductManagement = false;
  }

  goToCustomerDashboard() {
    this.router.navigate(['/customer']);
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        this.loadProducts(); // Refresh the product list
        this.resetAddProductForm(); // Reset form fields
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  updateProductDetails(): void {
    this.productService.updateProduct(this.updateProduct).subscribe({
      next: (response) => {
        console.log('Product updated:', response);
        this.loadProducts(); // Refresh the product list
        this.resetUpdateProductForm(); // Reset form fields
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  editProduct(product: Product): void {
    this.updateProduct = { ...product }; // Copy product to updateProduct
    // Optionally switch to the product management tab if needed
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Product deleted');
        this.loadProducts(); // Refresh the product list
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  cancelEdit(): void {
    this.updateProduct = new Product();
  }

  resetAddProductForm(): void {
    this.newProduct = new Product();
    if (this.addProductForm) {
      this.addProductForm.reset();
    }
  }

  resetUpdateProductForm(): void {
    this.updateProduct = new Product();
    if (this.updateProductForm) {
      this.updateProductForm.reset();
    }
  }
}

