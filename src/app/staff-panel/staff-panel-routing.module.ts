import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home-staff/home.component";
import {DishesManagementComponent} from "./dishes-management/dishes-management.component";
import {DessertManagementComponent} from "./dessert-management/dessert-management.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dishes', component:DishesManagementComponent},
  {path:'desserts', component: DessertManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPanelRoutingModule { }
