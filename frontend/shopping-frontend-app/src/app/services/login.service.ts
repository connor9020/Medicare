import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8181/login'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  signIn(login: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, login);
  }

  signUp(login: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, login);
  }
}
