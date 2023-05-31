import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPanelRoutingModule } from './staff-panel-routing.module';
import { HomeComponent } from './home-staff/home.component';
import {AdminPanelModule} from "../admin-panel/admin-panel.module";
import {AuthModule} from "../auth/auth.module";
import { StarterDishManagementComponent } from './starter-dish-management/starter-dish-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DessertManagementComponent } from './dessert-management/dessert-management.component';
import {JwtInterceptorProviders} from "../auth/helpers/jwt.interceptor";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import {NgxPaginationModule} from "ngx-pagination";
import { SandwichesManagementComponent } from './sandwiches-management/sandwiches-management.component';
import { PizzasManagementComponent } from './pizzas-management/pizzas-management.component';
import { OtherFoodComponent } from './other-food/other-food.component';


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

  ],
    imports: [
        CommonModule,
        StaffPanelRoutingModule,
        AdminPanelModule,
        AuthModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,

    ],
  providers: [JwtInterceptorProviders],
  entryComponents: [
    SandwichesManagementComponent,
    PizzasManagementComponent
  ]
})
export class StaffPanelModule { }
