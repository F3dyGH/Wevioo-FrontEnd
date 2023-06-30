import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserAccountComponent} from "./user-account/user-account.component";
import {HomeComponent} from "./home/home.component";
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
import { ReservationsHistoryComponent } from './user-account/reservations-history/reservations-history.component';
import { OrderTrackComponent } from './user-account/order-track/order-track.component';
import { BreakfastDrinksComponent } from './breakfast-drinks/breakfast-drinks.component';
import {AgoModule} from "../pipes/ago/ago.module";


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
    TimeCounterComponent,
    ReservationsHistoryComponent,
    OrderTrackComponent,
    BreakfastDrinksComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgoModule
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
