import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { DatePipe } from '@angular/common';
import { UpdateBalanceService } from '../services/updatebalance.service'; // Import the new service
import { Order } from '../models/order.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  emailid: string = "";
  name: string = "";
  phone: string = "";
  cid!: number;
  balance!: number;
  orders: (Order & { productName?: string })[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private updateBalanceService: UpdateBalanceService, // Use UpdateBalanceService here
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log('User object:', user); 
      this.emailid = user.emailid;
      this.name = user.name;
      this.phone = user.phone;
      this.cid = user.cid;
      this.balance = user.balance;
      this.loadOrders(); 
    } else {
      console.error("No user is logged in");
    }
  }

  loadOrders(): void {
    if (this.cid) {
      this.orderService.getOrders(this.cid).subscribe(
        async response => {
          this.orders = await Promise.all(
            response
            .sort((a, b) => b.id - a.id)
            .slice(0, 5)
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

  formatOrderDate(orderDate: string): string {
    const formattedDate = this.datePipe.transform(orderDate, 'MM-dd-yyyy HH:mm');
    return formattedDate ? formattedDate : orderDate;
  }

  logout(): void {
    sessionStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  handlePurchase(totalCost: number): void { // calculates new balance and updates it in db
    const newBalance = this.balance - totalCost;
    this.updateBalanceService.updateBalance(this.cid, newBalance).subscribe({
      next: (response) => {
        console.log('Balance updated:', response);
        this.balance = newBalance;
      },
      error: (error) => {
        console.error('Error updating balance:', error);
      }
    });
  }
}
