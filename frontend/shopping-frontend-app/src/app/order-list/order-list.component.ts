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
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.Cid) {
      this.orderService.getOrders(this.Cid).subscribe(
        async response => {
          this.orders = await Promise.all(
            response
            .sort((a, b) => b.id - a.id) // sorts orders by most recent OID
            .slice(0, 5) // limits orders on profile page to 5
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
}

