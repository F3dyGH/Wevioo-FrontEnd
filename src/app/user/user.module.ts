import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {JwtInterceptorProviders} from "../auth/helpers/jwt.interceptor";
import {AppComponent} from "../app.component";
import {HeaderComponent} from "./shared/header/header.component";


@NgModule({
  declarations: [
    /* LoginComponent,
      SignupComponent,*/
    ProfileComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // RouterOutlet,
    FormsModule,
    HttpClientModule
  ],
  providers: [JwtInterceptorProviders],
  exports: [
    HeaderComponent
  ],
  bootstrap: []
})
export class UserModule { }
