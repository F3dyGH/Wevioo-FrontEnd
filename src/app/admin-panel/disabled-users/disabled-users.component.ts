import { Component } from '@angular/core';
import {UsersManagementService} from "../services/users-management.service";

@Component({
  selector: 'app-disabled-users',
  templateUrl: './disabled-users.component.html',
  styleUrls: ['./disabled-users.component.css']
})
export class DisabledUsersComponent {
  users!: any[];
  roles!: any[];
  index = 0;
  selectedUser: any;
  selectedRole!: any;

  constructor(private userManagementService: UsersManagementService) {
  }

  ngOnInit(): void {
    this.userManagementService.getDisabledUsers()
      .subscribe((data: any[]) => {
        this.users = data;
      });
    this.userManagementService.getAllRoles().subscribe((data: any[]) => {
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
    this.userManagementService.updateUserRole(this.selectedUser.id, this.selectedRole).subscribe((res: any) => {
      this.userManagementService.getDisabledUsers().subscribe((data: any[]) => {
        this.users = data;
      });
      this.selectedUser = null;
    });
  }

  enableUser(id: any) {
    console.log(id);
    this.userManagementService.enableUser(id).subscribe(() => {
      this.userManagementService.getDisabledUsers().subscribe((data: any[]) => {
        this.users = data;
      });
    });
  }

}
