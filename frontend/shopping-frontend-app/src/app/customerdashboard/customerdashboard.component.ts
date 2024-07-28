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
  Cid!: number;
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
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log('User object:', user); // Log the user object to check its structure
      this.Cid = user.cid; // Get customer ID from user object
      this.loadOrders(); // Ensure Cid is set from sessionStorage
    } else {
      console.error("No user is logged in");
    }
  }

  loadOrders(): void {
    if (this.Cid) {
      this.orderService.getOrders(this.Cid).subscribe(
        async response => {
          this.orders = await Promise.all(
            response
              .sort((a, b) => b.id - a.id) // sorts orders by most recent OID
              .map(async order => {
                try {
                  const product = await this.productService.getProductById(order.productId).toPromise();
                  return { ...order, productName: product ? product.name : 'Unknown Product' };
                } catch (error) {
                  console.error(`Error fetching product details for productId: ${order.productId}`, error);
                  return { ...order, productName: 'Unknown Product' };
                }
              })
          );
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('Customer ID is not set');
    }
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
