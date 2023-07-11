import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  baseURL = 'http://localhost:8082/api/staff/menu'
  private apiUrl : string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.apiUrl+"staff/menu"
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
    return this.http.get(this.apiUrl + '/all', {headers});
  }

  addMenu(formData: FormData): Observable<any> {
    const headers = this.getHeader();
    console.log(headers)
    return this.http.post(this.baseURL + '/create', formData, {headers})
  }
  updateMenu(id : any ,formData : FormData) : Observable<any> {
    const headers = this.getHeader();
    return this.http.put(this.baseURL+'/update/'+ id, formData,{headers});
  }
  deleteMenu(id : any):Observable<any>{
    const headers = this.getHeader();
    return this.http.delete(this.baseURL +'/delete/' + id,{headers});
  }
}
