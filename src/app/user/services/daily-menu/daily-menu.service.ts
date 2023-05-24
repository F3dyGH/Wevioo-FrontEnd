import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DailyMenuService {
  baseUrl = "http://localhost:8082/api/user/menus/"
  menusDetailsUrl = "http://localhost:8082/api/user/menu/"

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getHeaders() {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders(
      'Authorization: Bearer ' + token
    );

    return headers;
  }

  getDailyMenu(date: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + date, {headers});
  }

  getMenuByName(name: any) : Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.menusDetailsUrl + name, {headers});
  }
}
