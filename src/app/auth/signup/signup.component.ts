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
    password: null,
    firstname : null,
    lastname : null
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage ='';

  constructor(private authService : AuthService,
              private router : Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void{
    const { username, password, firstname, lastname} = this.form;
console.log(this.form)
    this.authService.signup(username, password, firstname, lastname).subscribe({
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
