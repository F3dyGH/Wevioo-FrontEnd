import {Component, OnInit} from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  currentUser: any;
  content?: string;

  constructor(private storageService: StorageService, private userService: UserService) {
  }
  ngOnInit(): void {

  }
  logout(): void {
    this.storageService.clean();
  }
}
