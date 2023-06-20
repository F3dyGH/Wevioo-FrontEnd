import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/services/auth/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL: string;
  reservationsURL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = environment.apiUrl + 'user/'
    this.reservationsURL = environment.apiUrl + 'menuReservation/user/'
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

  updateUser(id: any, formData: FormData): Observable<any> {
    const headers = this.getHeader();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put(this.baseURL + 'update/' + id, formData, {headers})
  }

  getPhoto(photoName: any): Observable<any> {
    const token = this.authService.getaccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.baseURL + "photo/" + photoName, httpOptions);
  }

  updatePassword(id: any, password: any): Observable<any> {
    const headers = this.getHeader();
    const params = {password}
    return this.http.put(this.baseURL + 'changePassword/' + id, {}, {headers, params})
  }

  getReservationsHistory(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.reservationsURL + 'history/' + id, {headers})
  }

  orderTrack(id:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.get(this.reservationsURL+'today/'+id, {headers})
  }
}
