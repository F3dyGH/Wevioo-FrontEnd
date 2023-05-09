import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'http://localhost:8082/api/user/'

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

  updateUser(id: any, formData: FormData) : Observable<any>{
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
  updatePassword(id:any, password:any): Observable<any>{
    const headers = this.getHeader();
    const params = {password}
    return this.http.put(this.baseURL + 'changePassword/' + id, {},{headers, params})
  }
}
