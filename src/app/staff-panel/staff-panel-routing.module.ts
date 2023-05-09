import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-staff/home.component";
import {DishesManagementComponent} from "./dishes-management/dishes-management.component";
import {DessertManagementComponent} from "./dessert-management/dessert-management.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dishes', component:DishesManagementComponent},
  {path:'desserts', component: DessertManagementComponent},
  {path:'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPanelRoutingModule { }
