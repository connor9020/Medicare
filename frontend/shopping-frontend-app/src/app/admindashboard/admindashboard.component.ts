import { Component, OnInit } from '@angular/core';
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
    this.productService.addProduct(this.newProduct).subscribe(
      response => {
        console.log('Product added:', response);
        this.loadProducts(); // Refresh the product list
      },
      error => {
        console.error('Error adding product:', error);
      }
    );
  }

  updatePrice(): void {
    this.productService.updateProduct(this.updateProduct).subscribe(
      response => {
        console.log('Product price updated:', response);
        this.loadProducts(); // Refresh the product list
      },
      error => {
        console.error('Error updating price:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      response => {
        this.orders = response;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
