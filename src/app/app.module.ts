import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomeComponent } from './user/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
// import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        FormsModule,
        HttpClientModule,
        AuthModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
