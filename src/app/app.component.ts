import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {StorageService} from "./services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cantine-ng';
  private roles: string[] =[];
  isLoggedIn = false;
  username?: string;
  firstname?: string;
  lastname?: string;
  constructor(private authService : AuthService, private storageService: StorageService) {}
  ngOnInit(): void{
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
    }
  }
  logout(): void {
        this.storageService.clean();
  }
}
