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
  customerId: number = 1; // Assume a logged-in customer ID, replace as needed

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
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
    const purchases = this.cartItems.map(item => ({
      productId: item.productId,
      customerId: this.customerId,
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
