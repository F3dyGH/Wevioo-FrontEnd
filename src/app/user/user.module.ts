import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {UserAccountComponent} from "./user-account/user-account.component";
import {HomeComponent} from "./home/home.component";
import {RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {JwtInterceptorProviders} from "../auth/helpers/jwt.interceptor";
import {HeaderComponent} from "./shared/header/header.component";
import {UserInfosComponent} from './user-account/user-infos/user-infos.component';
import {EditInfosComponent} from './user-account/edit-infos/edit-infos.component';
import {ChangePasswordComponent} from './user-account/change-password/change-password.component';
import {DailyMenuComponent} from './daily-menu/daily-menu.component';
import {MenuDetailsComponent} from './daily-menu/menu-details/menu-details.component';
import {SandwichesComponent} from './sandwiches/sandwiches.component';
import {PizzaComponent} from './pizza/pizza.component';
import {FoodCategoriesComponent} from './food-categories/food-categories.component';
import {TimeCounterComponent} from './shared/time-counter/time-counter.component';


@NgModule({
  declarations: [
    UserAccountComponent,
    HomeComponent,
    HeaderComponent,
    UserInfosComponent,
    EditInfosComponent,
    ChangePasswordComponent,
    DailyMenuComponent,
    MenuDetailsComponent,
    SandwichesComponent,
    PizzaComponent,
    FoodCategoriesComponent,
    TimeCounterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    JwtInterceptorProviders,
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: []
})
export class UserModule {
}
