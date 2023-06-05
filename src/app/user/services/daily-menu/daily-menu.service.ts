import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class DailyMenuService {
  baseUrl:string
  menusDetailsUrl:string

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.apiUrl + 'user/menus/'
    this.menusDetailsUrl = environment.apiUrl + 'user/menu/'
  }

  getHeaders() {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders(
      'Authorization: Bearer ' + token
    );

    return headers;
  }

  getDailyMenu(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + "daily", {headers});
  }

  getMenuByName(name: any) : Observable<any>{
    const headers = this.getHeaders();
    return this.http.get(this.menusDetailsUrl + name, {headers});
  }
}
