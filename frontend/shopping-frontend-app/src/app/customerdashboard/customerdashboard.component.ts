import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  emailid: string = "";
  orders: Order[] = [];
  products: Product[] = [];
  cart: { product: Product, quantity: number }[] = [];

  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    let obj = sessionStorage.getItem("user");
    if (obj != null) {
      this.emailid = obj;
    }
    this.loadOrders();
    this.loadProducts();
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

  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(productId: number): void {
    const index = this.cart.findIndex(item => item.product.id === productId);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  updateCart(productId: number, quantity: number): void {
    const existingItem = this.cart.find(item => item.product.id === productId);
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  }

  checkout(): void {
    // Implement checkout logic here
    console.log('Checkout', this.cart);
  }
}

