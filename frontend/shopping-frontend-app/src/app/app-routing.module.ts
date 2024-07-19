import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customerdashboard/customerdashboard.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';

// http://localhost:4200/

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"customer",component:CustomerDashboardComponent},
  {path:"admin",component:AdminDashboardComponent},
  {path:"login",redirectTo:"/",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
