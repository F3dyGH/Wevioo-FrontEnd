import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {StorageService} from "../storage/storage.service";

const baseURL = 'http://localhost:8082/api/auth/'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = "auth-user";
  private jwtHelper!: JwtHelperService;
  constructor(private http:HttpClient, private storageService: StorageService, private router : Router) {
    this.jwtHelper = new JwtHelperService();
  }

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
    return this.http.post( baseURL+ 'forgot-password/' + email, {});
  }
  resetPassword(token: any, password: string) {
    const params = { token, password };
    return this.http.post<any>(baseURL+ 'reset-password', {}, { params });
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
  getUserId(){
    const token = this.getToken();
    if(token){
      const id = JSON.parse(token).id;
      return id;
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
      return role;
    } else {
      console.log('Token is not set in localStorage');
    }
  }
  public logout(): void {
    this.storageService.clean();
    this.router.navigate(['']);
  }

  public checkTokenExpiration(): void {
    const token = this.getaccessToken();
    console.log(token)
    if (token && this.jwtHelper.isTokenExpired(token)){
      this.logout();
    }
  }
}
