import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  baseURL = 'http://localhost:8082/api/staff/menu'

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return headers;

  }

  getAllMenus(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.baseURL + '/all', {headers});
  }

  addMenu( formData: FormData): Observable<any> {
    const headers = this.getHeader();
    console.log(headers)
    return this.http.post(this.baseURL + '/create', formData, {headers})
  }
}
