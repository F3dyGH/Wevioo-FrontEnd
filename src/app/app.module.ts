import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./auth/auth.module";
import {AdminPanelModule} from "./admin-panel/admin-panel.module";

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
        AuthModule,
        AdminPanelModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
