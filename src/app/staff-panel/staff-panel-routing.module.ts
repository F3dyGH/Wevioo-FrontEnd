import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-staff/home.component";
import {StarterDishManagementComponent} from "./starter-dish-management/starter-dish-management.component";
import {DessertManagementComponent} from "./dessert-management/dessert-management.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MenuManagementComponent} from "./menu-management/menu-management.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dishes', component:StarterDishManagementComponent},
  {path:'desserts', component: DessertManagementComponent},
  {path:'change-password', component: ChangePasswordComponent},
  {path:'menu-management', component:MenuManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPanelRoutingModule { }
