import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPanelRoutingModule } from './staff-panel-routing.module';
import { HomeComponent } from './home-staff/home.component';
import {AdminPanelModule} from "../admin-panel/admin-panel.module";
import {AuthModule} from "../auth/auth.module";
import { DishesManagementComponent } from './dishes-management/dishes-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    DishesManagementComponent
  ],
    imports: [
        CommonModule,
        StaffPanelRoutingModule,
        AdminPanelModule,
        AuthModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class StaffPanelModule { }
