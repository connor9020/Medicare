import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { CustomerService } from '../services/customer.service';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  emailid: string = "";
  customer: Customer | null = null; // Define the customer property
  orders: Order[] = [];
  products: Product[] = [];
  cart: { product: Product, quantity: number }[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    let obj = sessionStorage.getItem("user");
    if (obj != null) {
      let user = JSON.parse(obj); // Parse the JSON object
      this.emailid = user.emailid;
    }
    this.loadOrders();
    this.loadProducts();
    //this.loadCustomer(); // Call the loadCustomer method
  }
/*
  loadCustomer(): void {
    this.customerService.getCustomerByEmail(this.emailid).subscribe(
      response => {
        this.customer = response;
        console.log("Fetched customer:", this.customer);
      },
      error => {
        console.error('Error fetching customer:', error);
      }
    );
  }*/

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
