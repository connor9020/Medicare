import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.items);

  constructor() {}

  getItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.productId === item.productId);
    if (existingItem) { // if item already exists, add quantity
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.cartSubject.next(this.items); // update the cart subject
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.productId !== productId);
    this.cartSubject.next(this.items);
  }

  clearCart(): void {
    this.items = [];
    this.cartSubject.next(this.items);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
