import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-admin/home.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {DisabledUsersComponent} from "./disabled-users/disabled-users.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'users', component:UserManagementComponent},
  {path:'users/disabled', component:DisabledUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
