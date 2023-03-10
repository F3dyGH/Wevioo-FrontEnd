import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {StorageService} from "../services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form : any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isNotLoggedIn = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
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

    }
  }
  onSubmit(): void{
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: data =>{
        console.log(data);
        this.storageService.saveUser(data);
        this.isNotLoggedIn = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        const user = this.storageService.getUser();
        // this.router.navigate(['/profile'])
        if(user.roles == "ROLE_ADMIN"){
          this.router.navigate(['/admin']);
        }
        else if (user.roles == "ROLE_STAFF"){
          this.router.navigate(['/staff']);
        }
        else{
          this.router.navigate(["/home"]);
        }
      },
      error: err => {
          this.errorMessage = err.error.message;
          this.isNotLoggedIn = true;
      }
    })
  }
}
