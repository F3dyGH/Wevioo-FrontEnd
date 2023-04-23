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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return headers;

  }

  addDessertWithPhoto(dessert: any, photo: File): Observable<any> {
    /* const token = this.authService.getaccessToken();
     const headers = new HttpHeaders({
       'Content-Type': 'multipart/form-data',
       'Authorization': 'Bearer ' + token
     });*/
    const headers = this.getHeader();

    const formData = new FormData();
    formData.append('name', dessert.name);
    formData.append('price', dessert.price);
    formData.append('description', dessert.description);
    formData.append('file', photo);

    return this.http.post(`${this.baseURL}add`, formData, {headers});
  }
  getAllDesserts(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'all', {headers});
  }

  addDessert(formData: FormData): Observable<any> {
    // const headers = this.getHeader();
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.baseURL + 'add', formData,{headers})
  }
  addd(name:any,price:any,description:any,photo:any){
    const headers = this.getHeader();
    return this.http.post(this.baseURL+ 'add', {params: {name:name,price: price.toString(),description:description,photo:photo.toString()}}, {headers});
  }
  createDessert(dessert: any, file: File): Observable<any> {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    });
    const formData = new FormData();
    formData.append('name', dessert.name);
    formData.append('price', dessert.price);
    formData.append('description', dessert.description);
    formData.append('photo',file);
    console.log(formData);
    return this.http.post(this.baseURL + 'add', formData,{headers})
  }

  updateDessert(id: any, name: any, price: any, description: any, photo: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.put(this.baseURL + 'update/' + id, {
      name,
      price,
      description,
      photo
    }, {headers})
  }

  deleteDessert(id: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.delete(this.baseURL + 'delete/' + id, {headers});

  }


  getDessertById(id: any): Observable<any> {
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
