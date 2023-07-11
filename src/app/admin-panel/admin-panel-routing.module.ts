import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from "./user-management/user-management.component";
import {DisabledUsersComponent} from "./disabled-users/disabled-users.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MenuManagementComponent} from "../staff-panel/menu-management/menu-management.component";
import {TodayReservationsComponent} from "../staff-panel/reservations/today-reservations/today-reservations.component";
import {
  TreatedReservationsComponent
} from "../staff-panel/reservations/treated-reservations/treated-reservations.component";
import {
  PendingReservationsComponent
} from "../staff-panel/reservations/pending-reservations/pending-reservations.component";
import {
  CancelledReservationsComponent
} from "../staff-panel/reservations/cancelled-reservations/cancelled-reservations.component";
import {OtherFoodComponent} from "../staff-panel/other-food/other-food.component";
import {StarterDishManagementComponent} from "../staff-panel/starter-dish-management/starter-dish-management.component";
import {DessertManagementComponent} from "../staff-panel/dessert-management/dessert-management.component";

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'users', component:UserManagementComponent},
  {path:'users/disabled', component:DisabledUsersComponent},
  {path:'change-password', component:ChangePasswordComponent},
  {path:'menus', component:MenuManagementComponent},
  {path:'reservations', redirectTo:'reservations/today'},
  {path:'reservations/today', component:TodayReservationsComponent},
  {path:'reservations/treated', component:TreatedReservationsComponent},
  {path:'reservations/pending', component:PendingReservationsComponent},
  {path:'reservations/cancelled', component:CancelledReservationsComponent},
  {path:'starters', component:StarterDishManagementComponent},
  {path:'desserts', component: DessertManagementComponent},
  {path:':category' , component:OtherFoodComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
