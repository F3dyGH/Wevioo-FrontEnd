import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl : string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.apiUrl+"stats/"
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

  getTodayDrinksCount(): Observable<any>{
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/drinks/today', {headers});
  }
  getTodayBreakfastCount(): Observable<any>{
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/breakfast/today', {headers});
  }
  getTodayMenuCount(): Observable<any>{
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/menu/today', {headers});
  }
}
