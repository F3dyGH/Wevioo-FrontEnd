import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
  signup( username: any, password: any, firstname: any, lastname: any): Observable<any>{
    return this.http.post(baseURL + 'signup', {
      username,
      password,
      firstname,
      lastname
    },
      httpOptions
    );
  }
  forgotPassword(email: any) : Observable<any>{
    //const params = new HttpParams().set('email', email);
    return this.http.post( baseURL+ 'forgot-password/' + email, {});
  }
  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
  getaccessToken(): any {
    const token = this.getToken();
    if (token) {
      const tokenStr = JSON.parse(token).accessToken;
      return tokenStr;
    }
  }
  getUsername():any{
    const token = this.getToken();
    if (token) {
      const tokenStr = JSON.parse(token);
      const username = tokenStr.username;
      console.log(tokenStr);
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
