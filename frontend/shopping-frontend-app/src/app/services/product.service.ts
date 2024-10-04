import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> { // Customer dashboard uses this to populate the store -- the rest are mainly used by admin
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params: { name } });
  }

  updateStockAndLogOrder(purchases: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-stock-log-order`,  purchases );
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/type`, {
      params: new HttpParams().set('type', type)
    });
  }
}
