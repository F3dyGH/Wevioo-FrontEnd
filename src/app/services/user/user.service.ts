import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API = 'http://localhost:8082/api'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getPublicContent(): Observable<any> {
    return this.http.get(API + '/', {responseType: "text"});
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API + '/admin', {responseType: "text"});
  }
  getStaffBoard(): Observable<any> {
    return this.http.get(API + '/staff', {responseType: "text"});
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API + "/user");
  }

}
