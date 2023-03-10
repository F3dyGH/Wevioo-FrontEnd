import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './home-admin/home.component';
import { UserManagementComponent } from './user-management/user-management.component';
import {DialogModule} from "@angular/cdk/dialog";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    UserManagementComponent
  ],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    DialogModule,
    FormsModule
  ]
})
export class AdminPanelModule { }
