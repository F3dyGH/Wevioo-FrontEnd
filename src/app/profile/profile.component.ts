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
    this.currentUser = this.storageService.getUser();
      this.userService.getUserBoard().subscribe({
        next: data => {
          this.content = data;
        },
        error: err => {console.log(err)
          if (err.error) {
            this.content = JSON.parse(err.error).message;
          } else {
            this.content = "Error with status: " + err.status;
          }
        }
      });
  }
  logout(): void {
    this.storageService.clean();
  }
}
