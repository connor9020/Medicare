import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ // marks class as a service for components to inject
  providedIn: 'root'
})
export class UpdateBalanceService {
  private baseUrl = 'http://localhost:8181/login'; 

  constructor(private http: HttpClient) {}

  updateBalance(cid: number, newBalance: number): Observable<any> { //responsible for sending an HTTP PUT request to update the balance of a user identified by cid
    const url = `${this.baseUrl}/updateBalance`; 
    const body = { cid, balance: newBalance }; // creates object to be sent to backend for update
    return this.http.put(url, body, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response', responseType: 'text' as 'json' });
  }
}
