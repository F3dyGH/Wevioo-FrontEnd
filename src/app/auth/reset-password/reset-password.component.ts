import {Component} from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  form: any = {
    newPassword: null,
    confirmPassword: null
  };
  resetPasswordError!: string | null;
  resetPasswordSuccess!: string | null;
  isLoggedIn = false;
  roles: String[] = []
  token!: string | null;

  constructor(private storageService: StorageService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.token != null) {
      this.route.paramMap.subscribe(params => {
        this.token = params.get('token');
      });
      console.log(this.token)
    }else{
/*
      alert("Token expired or doesn't exist");
*/
    }
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      const user = this.storageService.getUser();
      window.alert('You are already logged in');
      if (user.roles == "ROLE_ADMIN") {
        this.router.navigate(['/admin']);
      }
      if (user.roles == "ROLE_STAFF") {
        this.router.navigate(['/staff'])
      }
    }
  }

  resetPassword(): void {
    if (this.form.newPassword === this.form.confirmPassword) {
      const resetToken = this.getResetToken();
      console.log(this.token);
      this.authService.resetPassword(this.token, this.form.confirmPassword).subscribe(
        success => {
          console.log(this.form.confirmPassword)
          this.resetPasswordSuccess = success;
          this.resetPasswordError = null;
        },
        error => {
          this.resetPasswordError = error;
          this.resetPasswordSuccess = null;
        }
      );
      this.router.navigate(["/login"]);
    } else {
      this.resetPasswordError = "Passwords don't match.";
      this.resetPasswordSuccess = null;
    }
  }
  getResetToken(){
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      this.route.queryParamMap.subscribe(params => {
        this.token = params.get('token');
      });
    });
  }
}
