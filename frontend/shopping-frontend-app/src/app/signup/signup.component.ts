import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  msg:string =""; // property that holds msg to be displayed to user like "signup sucessful"
  constructor(public loginservice :LoginService){} // DI for login service 

  signup(loginForm:NgForm): void {
    const formValues = loginForm.value

    this.loginservice.signUp(formValues).subscribe({ // passes the form data from 'login' object to create account
      next:(result:any)=> { // handles response from server
        this.msg=result
      },
      error:(error:any)=> {
        console.log(error)
      },
      complete:()=> {
        console.log("signup done!")
      }
    })

    loginForm.reset();
  }
}
