import { Component } from '@angular/core';
import {AuthService} from "./auth/services/auth/auth.service";
/*
import {AuthService} from "./services/auth/auth.service";
import {StorageService} from "./services/storage/storage.service";
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cantine-ng';


  constructor(private authService: AuthService) {
    this.authService.checkTokenExpiration()
  }
  ngOnInit(): void{}

}
