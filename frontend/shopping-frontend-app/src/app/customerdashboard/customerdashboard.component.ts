import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model'; // Ensure this import is correct

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  emailid: string = '';
  customers: Customer[] = [];

  ngOnInit(): void {
    let obj = sessionStorage.getItem('user');
    if (obj != null) {
      this.emailid = obj;
    }

    // Initialize customers if necessary
    // This could be from a service that fetches customer data
    this.customers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' }
      // Add more customers as needed
    ];
  }
}
