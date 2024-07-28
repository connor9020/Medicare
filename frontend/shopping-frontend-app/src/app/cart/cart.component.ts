import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cid!: number; // Use definite assignment assertion

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      this.cid = user.cid; // Set Cid from session storage
    } else {
      console.error("No user is logged in");
    }

    this.cartService.getItems().subscribe({
      next: (items: CartItem[]) => {
        this.cartItems = items;
      },
      error: (error) => {
        console.error('Error fetching cart items', error);
      }
    });
  }

  getTotalPrice(item: CartItem): number {
    return item.price * item.quantity;
  }

  getTotalOrderCost(): number {
    return this.cartItems.reduce((total, item) => total + this.getTotalPrice(item), 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeItem(productId);
  }

  purchase(): void {
    if (!this.cid) {
      console.error("Customer ID is not set");
      return;
    }

    const purchases = this.cartItems.map(item => ({
      productId: item.productId,
      cid: this.cid,
      quantity: item.quantity,
      totalPrice: this.getTotalPrice(item)
    }));

    console.log('Sending purchase request:', purchases); // Logging the purchase request for debugging

    this.productService.updateStockAndLogOrder(purchases).subscribe({
      next: () => {
        console.log('Stock updated and orders logged successfully');
        this.cartService.clearCart();
        this.cartItems = [];
      },
      error: (error) => {
        console.error('Error updating stock and logging orders:', error);
      }
    });
  }
}
