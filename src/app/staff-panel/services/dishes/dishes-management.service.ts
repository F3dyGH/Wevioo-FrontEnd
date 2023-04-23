import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DishesManagementService {
  private baseURL = 'http://localhost:8082/api/staff/dish/';
  photoUrl!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return headers;

  }

  getAllDishes(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'all', {headers});
  }

  addDish(formData: FormData): Observable<any> {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.post(this.baseURL + 'add', formData,{headers})
  }

  updateDish(id: any, name: any, price: any, description: any, photo: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.put(this.baseURL + 'update/' + id, {
      name,
      price,
      description,
      photo
    }, {headers})
  }

  deleteDish(id: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.delete(this.baseURL + 'delete/' + id, {headers});

  }


  getDishById(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.baseURL + id, {headers});
  }

  getPhoto(photoName: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.get(this.baseURL + "photo/" + photoName, {responseType: 'blob', headers});
  }

  uploadPhoto(id: any, file: any): Observable<any> {
    const headers = this.getHeader();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseURL + id + "/photo", formData, {headers});
  }
}
