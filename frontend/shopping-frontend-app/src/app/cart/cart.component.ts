import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/cart-item.model';
import { UpdateBalanceService } from '../services/updatebalance.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cid!: number;
  balance: number = 0;
  totalCost: number = 0;

  constructor(
    private cartService: CartService, 
    private productService: ProductService,
    private updateBalanceService: UpdateBalanceService
  ) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      this.cid = user.cid;
      this.balance = user.balance;
    } else {
      console.error("No user is logged in");
    }

    this.cartService.getItems().subscribe({
      next: (items: CartItem[]) => {
        this.cartItems = items;
        this.totalCost = this.getTotalOrderCost();
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
    this.totalCost = this.getTotalOrderCost();
  }

  purchase(): void {
    if (!this.cid) {
      console.error("Customer ID is not set");
      return;
    }

    this.totalCost = this.getTotalOrderCost();

    const purchases = this.cartItems.map(item => ({
      productId: item.productId,
      cid: this.cid,
      quantity: item.quantity,
      totalPrice: this.getTotalPrice(item)
    }));

    this.productService.updateStockAndLogOrder(purchases).subscribe({
      next: () => {
        this.updateBalanceAfterPurchase(this.totalCost);
      },
      error: (error) => {
        console.error('Error updating stock and logging orders:', error);
      }
    });
  }

  updateBalanceAfterPurchase(totalCost: number): void {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const newBalance = user.balance - totalCost;
  
      this.updateBalanceService.updateBalance(user.cid, newBalance).subscribe({
        next: (response) => {
          user.balance = newBalance;
          sessionStorage.setItem("user", JSON.stringify(user));
          this.cartService.clearCart();
          this.cartItems = [];
        },
        error: (error) => {
          console.error('Error updating balance:', error);
        }
      });
    } else {
      console.error("No user is logged in");
    }
  }
}
