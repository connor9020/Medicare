
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
