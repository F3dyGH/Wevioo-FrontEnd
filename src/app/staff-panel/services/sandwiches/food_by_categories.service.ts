import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Food_by_categoriesService {

  apiUrl: string;
  userApi:string;

  constructor(private authService :AuthService, private http: HttpClient) {
    this.apiUrl = environment.apiUrl+"staff/foodDrinks/"
    this.userApi = environment.apiUrl+"user/"
  }

  getHeaders() {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders(
      'Authorization: Bearer ' + token
    );
    return headers;
  }

  getByCategory(category:any):Observable<any>{
    const headers = this.getHeaders();
    console.log(category);
    return this.http.get(this.apiUrl+category,{headers})
  }

  getByCategoryUser(category: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(category);
    return this.http.get(this.userApi + category, {headers})
  }

  add(formData: FormData): Observable<any> {
    const headers = this.getHeaders();
    console.log(headers)
    return this.http.post(this.apiUrl + 'create', formData, {headers})
  }

  update(id: any, formData: FormData): Observable<any> {

    const headers = this.getHeaders();

    return this.http.put(this.apiUrl + 'update/' + id, formData, {headers})
  }

  delete(id: any): Observable<any> {

    const headers = this.getHeaders();
    return this.http.delete(this.apiUrl + 'delete/' + id, {headers});

  }

}
