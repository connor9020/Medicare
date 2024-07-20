import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://localhost:8084/inventories'; 

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseUrl}`);
  }

  // Add more methods as needed for CRUD operations
}
