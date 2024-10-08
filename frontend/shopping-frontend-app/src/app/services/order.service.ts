import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8081/orders';

  constructor(private http: HttpClient) { }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    const createdOrder = this.http.post<Order>(`${this.baseUrl}`, order);
    return createdOrder;
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getOrders(Cid?: number): Observable<Order[]> {
    let params = new HttpParams();
    if (Cid) {
      params = params.set('Cid', Cid.toString());
    }
    return this.http.get<Order[]>(`${this.baseUrl}/customer`, { params });
  }

  getOrdersByCid(Cid: number): Observable<Order[]> { // unverified redundant with above method
    const params = new HttpParams().set('Cid', Cid.toString());
    return this.http.get<Order[]>(`${this.baseUrl}/customer`, { params });
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/all`);
  }

  updateBalance(userId: number, newBalance: number): Observable<any> {
    const url = `http://localhost:8181/login/updateBalance`;
    return this.http.put(url, { cid: userId, balance: newBalance });
  }
}
