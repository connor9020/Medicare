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
  @ViewChild('updatePriceForm') updatePriceForm!: NgForm;

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

  updatePrice(): void {
    this.productService.updateProduct(this.updateProduct).subscribe({
      next: (response) => {
        console.log('Product price updated:', response);
        this.loadProducts(); // Refresh the product list
        this.resetUpdatePriceForm(); // Reset form fields
      },
      error: (error) => {
        console.error('Error updating price:', error);
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

  resetAddProductForm(): void {
    this.newProduct = new Product();
    if (this.addProductForm) {
      this.addProductForm.reset();
    }
  }

  resetUpdatePriceForm(): void {
    this.updateProduct = new Product();
    if (this.updatePriceForm) {
      this.updatePriceForm.reset();
    }
  }
}
