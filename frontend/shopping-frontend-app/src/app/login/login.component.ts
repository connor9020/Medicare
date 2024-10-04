import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  loginForm = new FormGroup({  // binds data to form properties
    emailid: new FormControl(),
    password: new FormControl(),
    typeofuser: new FormControl()
  });
  msg: string = ""; // this property holds the message to be displayed to the user

  constructor(public loginservice: LoginService, public router: Router) {}

  signin(): void {
    let login = this.loginForm.value; // assigns the values of the form-loginRef to an object

    this.loginservice.signIn(login).subscribe({ // calls signin method from login service - passing form data from login object above to authenticate user
      next: (result: any) => { // if the login in successful it will look for the messages below for routing
        console.log(result);
        this.msg = result.message; 
        if (this.msg === "Admin login successfully" || this.msg === "Customer login successfully") { // routes user through correct portal
          sessionStorage.setItem("user", JSON.stringify(result));
          if (this.msg === "Admin login successfully") {
            this.router.navigate(["admin"], { skipLocationChange: true }); // same as below for admin
          } else if (this.msg === "Customer login successfully") {
            this.router.navigate(["customer"], { skipLocationChange: true }); // if loginService method passes in backend, we get the right message which directs us to the home page 
          }
        } else {
          this.msg = result.message || "Login failed. Please check your credentials.";
        }
      },
      error: (error: any) => { // handles errors during login
        console.log(error);
        this.msg = "An error occurred during login. Please try again.";
      },
      complete: () => console.log("signin done!")
    });

    this.loginForm.reset();
  }
}
