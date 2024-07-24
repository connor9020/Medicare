import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = "";
  name: string = "";
  phone: string = "";
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    let obj = sessionStorage.getItem("user");
    console.log("User data from session storage:", obj);
    if (obj != null) {
      try {
        let user = JSON.parse(obj);
        console.log("Parsed user data:", user);
        this.email = user.emailid;
        this.name = user.name;
        this.phone = user.phone;
      } catch (e) {
        console.error("Error parsing user data from session storage", e);
      }
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      response => {
        this.orders = response;
        console.log("Fetched orders:", this.orders);
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
