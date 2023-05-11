import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPanelRoutingModule } from './staff-panel-routing.module';
import { HomeComponent } from './home-staff/home.component';
import {AdminPanelModule} from "../admin-panel/admin-panel.module";
import {AuthModule} from "../auth/auth.module";
import { DishesManagementComponent } from './dishes-management/dishes-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxFileDropModule} from "ngx-file-drop";
import { DessertManagementComponent } from './dessert-management/dessert-management.component';
import {JwtInterceptorProviders} from "../auth/helpers/jwt.interceptor";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MenuManagementComponent } from './menu-management/menu-management.component';


@NgModule({
  declarations: [
    HomeComponent,
    DishesManagementComponent,
    DessertManagementComponent,
    ChangePasswordComponent,
    MenuManagementComponent
  ],
    imports: [
        CommonModule,
        StaffPanelRoutingModule,
        AdminPanelModule,
        AuthModule,
        ReactiveFormsModule,
        FormsModule,
        NgxFileDropModule
    ],
  providers: [JwtInterceptorProviders]
})
export class StaffPanelModule { }
