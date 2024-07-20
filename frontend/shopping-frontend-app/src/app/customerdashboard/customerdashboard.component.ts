import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  emailid: string = "";
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    let obj = sessionStorage.getItem("user");
    if (obj != null) {
      this.emailid = obj;
    }
    this.loadOrders();
  }

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
}

