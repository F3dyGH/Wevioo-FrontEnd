import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})
export class UserInfosComponent implements OnInit{
  currentUser: any;
  userId= this.authService.getUserId();
  constructor(private authService:AuthService, private userService: UsersManagementService) {

  }
  ngOnInit(): void {
    this.currentUser = this.userService.getUser(this.userId).subscribe((data: any[]) => {
      this.currentUser = data;
      console.log(this.currentUser)
    });
    console.log(this.currentUser);
    console.log(this.userId);
  }

}
