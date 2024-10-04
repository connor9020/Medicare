import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [DatePipe]
})
export class OrderListComponent implements OnInit {
  // initialize properties of orderlist component
  emailid: string = "";
  name: string = "";
  phone: string = "";
  Cid!: number; // defintite assignment assertion for cid per session
  orders: (Order & { productName?: string })[] = []; // Extend Order with productName

    constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private datePipe: DatePipe
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
                const product = await this.productService.getProductById(order.productId).toPromise(); // after sorting, fetch productName for the order
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
}

