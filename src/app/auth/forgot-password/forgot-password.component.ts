import {Component, OnInit} from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  form : any = {
    email: null,
  };

  isLoggedIn = false;
  roles: String[] =[]
  constructor(private storageService : StorageService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      const user = this.storageService.getUser();
      setTimeout(() => {
        window.alert('You are already logged in');
      }, 500);
      if(user.roles == "ROLE_ADMIN"){
        this.router.navigate(['/admin']);
      }
      if(user.roles == "ROLE_STAFF"){
        this.router.navigate(['/staff'])
      }

    } if(this.storageService.isLoggedIn()){
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      const user = this.storageService.getUser();
      setTimeout(() => {
        window.alert('You are already logged in');
      }, 500);
      if(user.roles == "ROLE_ADMIN"){
        this.router.navigate(['/admin']);
      }
      if(user.roles == "ROLE_STAFF"){
        this.router.navigate(['/staff'])
      }

    }
  }
  onSubmit(email: string): void{

    console.log(email)

    this.authService.forgotPassword(email).subscribe({
      next: data =>{
                  this.router.navigate(["/home"]);
        }
    })
  }
}
