import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customerdashboard/customerdashboard.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfileComponent } from './profile/profile.component';

// http://localhost:4200/

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "customer", component: CustomerDashboardComponent, children: [
      { path: "", redirectTo: "products", pathMatch: "full" },
      { path: "products", component: ProductListComponent },
      { path: "orders", component: OrderListComponent },
      { path: "profile", component: ProfileComponent }
    ]
  },
  { path: "admin", component: AdminDashboardComponent },
  { path: "login", redirectTo: "/", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

