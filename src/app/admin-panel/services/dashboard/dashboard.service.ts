import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.apiUrl + "stats/"
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

  getTodayDrinksCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/drinks/today', {headers});
  }

  getTodayCancelledDrinksCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/drinks/today/cancelled', {headers});
  }

  getTodayPendingDrinksCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/drinks/today/pending', {headers});
  }

  getTodayAllDrinksCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/drinks/today/all', {headers});
  }

  getTodayBreakfastCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/breakfast/today', {headers});
  }

  getTodayAllBreakfastCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/breakfast/today/all', {headers});
  }

  getTodayCancelledBreakfastCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/breakfast/today/cancelled', {headers});
  }

  getTodayPendingBreakfastCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/breakfast/today/pending', {headers});
  }

  getTodayMenuCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/menu/today', {headers});
  }

  getTodayAllMenuCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/menu/today/all', {headers});
  }

  getTodayCancelledMenuCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/menu/today/cancelled', {headers});
  }

  getTodayPendingMenuCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/menu/today/pending', {headers});
  }

  getTodayAllReservationsCount(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/today', {headers});
  }

  getMealPopularity(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'popularity', {headers});
  }

  getReservationTrends(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'monthly', {headers});
  }

  getTodayReservationsProfit(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/today/profit', {headers});
  }

  getTodayDrinksReservationProfit(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/today/drinks/profit', {headers});
  }

  getTodayBreakfastReservationProfit(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/today/breakfast/profit', {headers});
  }

  getTodayMenuReservationProfit(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/today/menu/profit', {headers});
  }

  getMonthlyReservationsProfit(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.apiUrl + 'reservations/monthly/profit', {headers});
  }


}
