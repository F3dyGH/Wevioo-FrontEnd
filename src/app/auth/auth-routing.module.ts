import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfirmComponent} from "./forgot-password/confirm/confirm.component";

const routes: Routes = [
  {path:'forgot-password/confirm', component: ConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
