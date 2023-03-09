import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishesManagementService {
  private baseURL = 'http://localhost:8082/api/staff/dish/';

  constructor(private http: HttpClient) {
  }

  getAllDishes(): Observable<any> {
    return this.http.get(this.baseURL + 'all', {withCredentials: true});
  }

  addDish(name: string, price: any, photo: any, description: string): Observable<any> {
    return this.http.post(this.baseURL + 'add', {
      name,
      price,
      photo,
      description
    })
  }

  updateDish(name: string, price: any, photo: any, description: string): Observable<any> {
    return this.http.put(this.http + 'update', {
      name,
      price,
      photo,
      description
    })
  }

  deleteDish(id: any): Observable<any> {
    return this.http.delete(this.baseURL + 'delete/' + id);
  }

  getDishById(id: any): Observable<any> {
    return this.http.get(this.baseURL + id);
  }

}
