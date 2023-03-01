import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "./auth/services/guard/auth-guard.service";
import {AdminGuardService} from "./admin-panel/guard/guard.service";
import {StaffGuardService} from "./staff-panel/guard/guard.service";


const routes: Routes = [
  {path: '', loadChildren:()=> import('./user/user.module').then(m => m.UserModule)},
  {path: 'admin', loadChildren:() => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule), canActivate: [AdminGuardService]},
  {path: 'staff', loadChildren:() => import('./staff-panel/staff-panel.module').then(m => m.StaffPanelModule), canActivate: [StaffGuardService]},
  {path:'login', loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuardService]},
  {path:'signup', loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
