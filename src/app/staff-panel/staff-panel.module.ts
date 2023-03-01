import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPanelRoutingModule } from './staff-panel-routing.module';
import { HomeComponent } from './home-staff/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    StaffPanelRoutingModule
  ]
})
export class StaffPanelModule { }
