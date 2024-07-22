import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customerdashboard/customerdashboard.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // Ensure this component exists

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "customer", component: CustomerDashboardComponent, children: [
      { path: "", redirectTo: "products", pathMatch: "full" },
      { path: "products", component: ProductListComponent },
      { path: "orders", component: OrderListComponent },
      { path: "profile", component: ProfileComponent },
      { path: "cart", component: CartComponent } // Added route for customer/cart
    ]
  },
  { path: "admin", component: AdminDashboardComponent },
  { path: "login", redirectTo: "/", pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent } // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
