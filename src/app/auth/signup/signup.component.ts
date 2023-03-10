import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form : any = {

    username: null,
    email: null,
    password: null,
    firstName : null,
    lastName : null
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage ='';

  constructor(private authService : AuthService,
              private router : Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void{
    const { username, email, password, firstname, lastname} = this.form;

    this.authService.signup(username, email, firstname, lastname, password).subscribe({
      next : data => {
        console.log(data),
            this.isSuccessful = true,
            this.isFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    });
  }
}
