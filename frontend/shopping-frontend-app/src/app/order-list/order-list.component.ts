import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [DatePipe]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private datePipe: DatePipe) { }

  ngOnInit(): void {
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

  formatOrderDate(orderDate: string): string {
    const formattedDate = this.datePipe.transform(orderDate, 'MM-dd-yyyy HH:mm');
    return formattedDate ? formattedDate : orderDate;
  }
}

