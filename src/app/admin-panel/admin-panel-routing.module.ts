import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-admin/home.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {DisabledUsersComponent} from "./disabled-users/disabled-users.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'users', component:UserManagementComponent},
  {path:'users/disabled', component:DisabledUsersComponent},
  {path:'change-password', component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
