import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {StorageService} from "../services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  isLoggedIn = false;
  isNotLoggedIn = false;
  isEnabled = true;
  errorMessage?: string;
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.isEnabled = this.storageService.getUser().enabled;
      const user = this.storageService.getUser();
      setTimeout(() => {
        window.alert('You are already logged in');
      }, 500);
      if (user.roles == "ROLE_ADMIN") {
        this.router.navigate(['/admin']);
      }
      if (user.roles == "ROLE_STAFF") {
        this.router.navigate(['/staff/reservations'])
      }
    }
  }

  onSubmit(): void {
    const {email, password} = this.form;
    console.log(this.form.password)
    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);
        this.isNotLoggedIn = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        const user = this.storageService.getUser();
        if (user.roles == "ROLE_ADMIN") {
          this.router.navigate(['/admin/dashboard']);
        } else if (user.roles == "ROLE_STAFF") {
          this.router.navigate(['/staff/reservations']);
        } else {
          this.router.navigate(["/home"]);
        }
      },
      error: err => {
        if (err.status == 401) {
          this.errorMessage = "Invalid Credentials";
          this.isNotLoggedIn = true;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
        if (err.status == 403) {
          this.errorMessage = "Your account is disabled, please contact the admin"

          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      }
    })
  }
}
