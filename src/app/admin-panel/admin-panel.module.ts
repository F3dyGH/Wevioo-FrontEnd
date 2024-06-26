import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './home-admin/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {DialogModule} from "@angular/cdk/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DisabledUsersComponent } from './disabled-users/disabled-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {AgoModule} from "../pipes/ago/ago.module";
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    UserManagementComponent,
    DisabledUsersComponent,
    ChangePasswordComponent,
    DashboardComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    AgoModule
  ]
})
export class AdminPanelModule { }
