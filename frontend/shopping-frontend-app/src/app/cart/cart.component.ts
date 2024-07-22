import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

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
}
