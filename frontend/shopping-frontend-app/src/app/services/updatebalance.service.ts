import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateBalanceService {
  private baseUrl = 'http://localhost:8181/login'; // Adjust the URL if necessary

  constructor(private http: HttpClient) {}

  updateBalance(cid: number, newBalance: number): Observable<any> {
    const url = `${this.baseUrl}/updateBalance`;
    const body = { cid, balance: newBalance };
    return this.http.put(url, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response', responseType: 'text' as 'json' });
  }
}
