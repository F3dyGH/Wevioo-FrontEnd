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

  getTreatedReservations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/TREATED", {headers})
  }

  getInProcessReservations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/IN_PROCESS", {headers})
  }

  getCancelledReservations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl + "/CANCELLED", {headers})
  }

  treatReservation(reservation: number, staff: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.apiUrl + "/treat/" + reservation + "/" + staff, null, {headers})
  }

  cancelReservation(reservation: number, staff: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.apiUrl + "/cancel/" + reservation + "/" + staff, null, {headers})
  }

  addReservation(userId:any, menuId:any, starterId:any):Observable<any>{
    const params = {
      userId, menuId, starterId
    }
    return this.http.post(this.apiUrl + "/create", null, {params});
  }
}
