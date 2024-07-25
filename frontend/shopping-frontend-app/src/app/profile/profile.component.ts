import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { ProductService } from '../services/product.service'; // Import ProductService
import { DatePipe } from '@angular/common';

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
  customerId!: number; // defintite assignment assertion for cid per session
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
      this.emailid = user.emailid;
      this.name = user.name;
      this.phone = user.phone;
      this.customerId = user.cid; // Get customer ID from user object
      this.loadOrders(); // ensure customerId is set from sessionstorage
    } else {
      console.error("No user is logged in");
    }
  }

  loadOrders(): void {
    if (this.customerId) {
      this.orderService.getOrders(this.customerId).subscribe(
        async response => {
          this.orders = await Promise.all(
            response.sort((a, b) => b.id - a.id).map(async order => {
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
}
