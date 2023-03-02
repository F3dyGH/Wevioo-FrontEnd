import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private baseURL = 'http://localhost:8082/api/admin/'

  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<any>{
    return this.http.get( this.baseURL + 'all-users', httpOptions);
  }
}
