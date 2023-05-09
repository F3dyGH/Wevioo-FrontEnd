import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth/auth.service";
import {StorageService} from "../../auth/services/storage/storage.service";
// import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isLoggedIn = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()){
      this.isLoggedIn =true;
    }
  }
}
