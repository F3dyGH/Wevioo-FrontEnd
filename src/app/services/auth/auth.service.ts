import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseURL = 'http://localhost:8082/api/auth/'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {}

  login(username: string, password: string): Observable<any>{
    return this.http.post(baseURL + 'login',
      {
              username,
              password
           },
      httpOptions
      );
  }
  signup(username: string, email: string, password: string, firstname: string, lastname: string): Observable<any>{
    return this.http.post(baseURL + 'signup', {
      username,
      email,
      password,
      firstname,
      lastname
    },
      httpOptions
    );
  }
}
