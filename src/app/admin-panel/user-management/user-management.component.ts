import {Component, OnInit} from '@angular/core';
import {UsersManagementService} from "../services/users-management.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users!: any[];
  roles!: any[];

  selectedUser: any;
  selectedRole!: any;

  constructor(private userManagementService: UsersManagementService, private router: Router) {
  }

  ngOnInit(): void {
    this.userManagementService.getAllUsers()
      .subscribe((data: any[]) => {
        this.users = data;
      });
    this.userManagementService.getAllRoles().subscribe((data:any[])=>{
      this.roles = data;
    })
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.selectedRole = user.roles[0].id;
    console.log(this.selectedUser)
    console.log(this.selectedRole);
  }

  updateUserRole() {
    //console.log(user);
    //const roleId = this.selectedUser.roles[0].id;
    this.userManagementService.updateUserRole(this.selectedUser.id,this.selectedRole).subscribe((res: any) => {
      this.userManagementService.getAllUsers().subscribe((data: any[]) => {
        this.users = data;
      });
      this.selectedUser = null;
    });
  }

  deleteUser(id:any) {
    console.log(id);
    this.userManagementService.deleteUser(id).subscribe(()=>{
      this.userManagementService.getAllUsers().subscribe((data: any[]) => {
        this.users = data;
      });
    });
  }

}
