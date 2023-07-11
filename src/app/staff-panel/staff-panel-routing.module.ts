import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarterDishManagementComponent} from "./starter-dish-management/starter-dish-management.component";
import {DessertManagementComponent} from "./dessert-management/dessert-management.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MenuManagementComponent} from "./menu-management/menu-management.component";
import {OtherFoodComponent} from "./other-food/other-food.component";
import {TodayReservationsComponent} from "./reservations/today-reservations/today-reservations.component";
import {TreatedReservationsComponent} from "./reservations/treated-reservations/treated-reservations.component";
import {PendingReservationsComponent} from "./reservations/pending-reservations/pending-reservations.component";
import {CancelledReservationsComponent} from "./reservations/cancelled-reservations/cancelled-reservations.component";

const routes: Routes = [
  {path:'reservations', redirectTo:'reservations/today'},
  {path:'reservations/today', component:TodayReservationsComponent},
  {path:'reservations/treated', component:TreatedReservationsComponent},
  {path:'reservations/pending', component:PendingReservationsComponent},
  {path:'reservations/cancelled', component:CancelledReservationsComponent},
  {path:'starters', component:StarterDishManagementComponent},
  {path:'desserts', component: DessertManagementComponent},
  {path:'change-password', component: ChangePasswordComponent},
  {path:'menu-management', component:MenuManagementComponent},
  {path:':category' , component:OtherFoodComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffPanelRoutingModule { }
