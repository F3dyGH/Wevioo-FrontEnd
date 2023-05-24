import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";
import {ForgotPasswordComponent} from "../auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "../auth/reset-password/reset-password.component";
import {UserInfosComponent} from "./user-account/user-infos/user-infos.component";
import {AuthGuardService} from "../auth/services/guard/auth-guard.service";
import {EditInfosComponent} from "./user-account/edit-infos/edit-infos.component";
import {ChangePasswordComponent} from "./user-account/change-password/change-password.component";
import {DailyMenuComponent} from "./daily-menu/daily-menu.component";
import {MenuDetailsComponent} from "./daily-menu/menu-details/menu-details.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', redirectTo:''},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'reset-password', component:ResetPasswordComponent},
  {path:'profile', component:UserInfosComponent, canActivate: [AuthGuardService]},
  {path:'profile/edit', component:EditInfosComponent, canActivate: [AuthGuardService]},
  {path:'profile/change-password', component:ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path:'menu', component: DailyMenuComponent, canActivate: [AuthGuardService]},
  {path:'menu/:name', component: MenuDetailsComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
