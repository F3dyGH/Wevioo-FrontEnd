import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  apiUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.apiUrl + 'menuReservation'
  }

  getHeaders() {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders(
      'Authorization: Bearer ' + token
    );
    return headers;
  }

  getReservations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/all", {headers});
  }

  getTodayReservations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/today", {headers})
  }

  getTreatedReservations():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/TREATED", {headers})
  }
  getInProcessReservations():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/IN_PROCESS", {headers})
  }
  getCancelledReservations():Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/CANCELLED", {headers})
  }
}
