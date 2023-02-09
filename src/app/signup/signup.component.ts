import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

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

    this.authService.signup(username, email, password, firstname, lastname).subscribe({
      next : data => {
        console.log(data),
            this.isSuccessful = true,
            this.isFailed = false;
        this.router.navigate(['/profile']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    });
  }
}
