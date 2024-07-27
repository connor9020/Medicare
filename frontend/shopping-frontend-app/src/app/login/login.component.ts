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
  loginRef = new FormGroup({
    emailid: new FormControl(),
    password: new FormControl(),
    typeofuser: new FormControl()
  });
  msg: string = "";

  constructor(public ls: LoginService, public router: Router) {}

  signin(): void {
    let login = this.loginRef.value;
    console.log(login);

    this.ls.signIn(login).subscribe({
      next: (result: any) => {
        console.log(result);
        this.msg = result.message;
        if (this.msg === "Admin login successfully" || this.msg === "Customer login successfully") {
          sessionStorage.setItem("user", JSON.stringify(result));
          if (this.msg === "Admin login successfully") {
            this.router.navigate(["admin"], { skipLocationChange: true });
          } else if (this.msg === "Customer login successfully") {
            this.router.navigate(["customer"], { skipLocationChange: true });
          }
        } else {
          this.msg = result.message || "Login failed. Please check your credentials.";
        }
      },
      error: (error: any) => {
        console.log(error);
        this.msg = "An error occurred during login. Please try again.";
      },
      complete: () => console.log("signin done!")
    });

    this.loginRef.reset();
  }
}
