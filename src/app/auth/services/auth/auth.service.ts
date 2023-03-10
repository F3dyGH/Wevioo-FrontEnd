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
  private authTokenKey = "auth-user";
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
  signup(username: string, email: string, firstname: string, lastname: string, password: string): Observable<any>{
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
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }
  getToken(): string | null {
     return localStorage.getItem(this.authTokenKey);
  }
  getUsername():any{
    const token = this.getToken();
    if (token) {
      const tokenStr = JSON.parse(token);
      const username = tokenStr.username;
      console.log(username);
      return username;
    } else {
      console.log('Token is not set in localStorage');
    }
  }
  getRole():any{
    const token = this.getToken();
    if (token) {
      const tokenStr = JSON.parse(token);
      const role = tokenStr.roles;
      console.log(role);
      return role;
    } else {
      console.log('Token is not set in localStorage');
    }
  }
}
