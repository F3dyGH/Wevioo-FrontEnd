import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StaffPanelRoutingModule} from './staff-panel-routing.module';
import {HomeComponent} from './home-staff/home.component';
import {AdminPanelModule} from "../admin-panel/admin-panel.module";
import {AuthModule} from "../auth/auth.module";
import {StarterDishManagementComponent} from './starter-dish-management/starter-dish-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DessertManagementComponent} from './dessert-management/dessert-management.component';
import {JwtInterceptorProviders} from "../auth/helpers/jwt.interceptor";
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MenuManagementComponent} from './menu-management/menu-management.component';
import {NgxPaginationModule} from "ngx-pagination";
import {SandwichesManagementComponent} from './sandwiches-management/sandwiches-management.component';
import {PizzasManagementComponent} from './pizzas-management/pizzas-management.component';
import {OtherFoodComponent} from './other-food/other-food.component';
import {TodayReservationsComponent} from './reservations/today-reservations/today-reservations.component';
import {TreatedReservationsComponent} from './reservations/treated-reservations/treated-reservations.component';
import {PendingReservationsComponent} from './reservations/pending-reservations/pending-reservations.component';
import {CancelledReservationsComponent} from './reservations/cancelled-reservations/cancelled-reservations.component';
import {BreakfastManagementComponent} from './breakfast-management/breakfast-management.component';
import {DrinksManagementComponent} from './drinks-management/drinks-management.component';
import {AgoModule} from "../pipes/ago/ago.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [
    HomeComponent,
    StarterDishManagementComponent,
    DessertManagementComponent,
    ChangePasswordComponent,
    MenuManagementComponent,
    SandwichesManagementComponent,
    PizzasManagementComponent,
    OtherFoodComponent,
    TodayReservationsComponent,
    TreatedReservationsComponent,
    PendingReservationsComponent,
    CancelledReservationsComponent,
    BreakfastManagementComponent,
    DrinksManagementComponent,
  ],
    imports: [
        CommonModule,
        StaffPanelRoutingModule,
        AdminPanelModule,
        AuthModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        AgoModule,
        Ng2SearchPipeModule
    ],
  providers: [JwtInterceptorProviders],
  entryComponents: [
    SandwichesManagementComponent,
    PizzasManagementComponent
  ]
})
export class StaffPanelModule {
}
