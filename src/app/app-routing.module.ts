import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./user/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AuthGuardService} from "./auth/services/guard/auth-guard.service";
/*
import {AdminComponent} from "./admin/admin.component";
*/

const routes: Routes = [
  {path: '', loadChildren:()=> import('./user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren:() => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule), canActivate: [AuthGuardService]},
  {path: 'staff', loadChildren:() => import('./staff-panel/staff-panel.module').then(m => m.StaffPanelModule)},
  {path:'login', loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'signup', loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
