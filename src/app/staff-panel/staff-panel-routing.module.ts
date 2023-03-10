import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-staff/home.component";
import {DishesManagementComponent} from "./dishes-management/dishes-management.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dishes', component:DishesManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPanelRoutingModule { }
