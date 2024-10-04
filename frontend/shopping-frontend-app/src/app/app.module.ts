import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customerdashboard/customerdashboard.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductService } from './services/product.service';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { UpdateBalanceService } from './services/updatebalance.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CustomerDashboardComponent,
    AdminDashboardComponent,
    ProductListComponent,
    OrderListComponent,
    ProfileComponent,
    CartComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, // essential for applications running in browser provides services and directives for working with the DOM, such as 'NgIf' and 'NgFor'
    AppRoutingModule, //manages navigation between different views or pages of the app
    HttpClientModule, // allows your app to communicate with backend services over HTTP
    FormsModule, // allows forms like 'NgModel'
    ModalModule.forRoot(), // 'ngx-bootstrap' provides modals - pop up quantity selection to put in cart
    ReactiveFormsModule, // form building and validation
    CommonModule
  ],
  providers: [ProductService, ProductListComponent, UpdateBalanceService],
  bootstrap: [AppComponent] // root component that Angular bootstraps when starting the app
})
export class AppModule { }
