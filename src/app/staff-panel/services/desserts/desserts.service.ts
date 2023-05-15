import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DessertsService {
  private baseURL = 'http://localhost:8082/api/staff/dessert/';

  constructor(private http : HttpClient, private authService: AuthService) { }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return headers;

  }

  getAllDesserts(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'all', {headers});
  }

  addDessert(formData: FormData): Observable<any> {
    const headers = this.getHeader();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept','application/json');

    return this.http.post(this.baseURL + 'add', formData,{headers})
  }

  updateDessert(id: any, formData: FormData): Observable<any> {

    const headers = this.getHeader();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put(this.baseURL + 'update/' + id, formData, {headers})
  }

  deleteDessert(id: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.delete(this.baseURL + 'delete/' + id, {headers});

  }

  getDessertById(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.baseURL + id, {headers});
  }

}
