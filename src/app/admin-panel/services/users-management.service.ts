import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../auth/services/storage/storage.service";


@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private baseURL = 'http://localhost:8082/api/admin/'

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<any> {

    /*const token = JSON.parse(JSON.stringify(sessionStorage.getItem('auth-user')));

    const headers = new HttpHeaders({
      'content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    });
    console.log(headers);*/
    return this.http.get(this.baseURL + 'all-users', { /*headers: headers,*/ withCredentials: true});
  }

  updateUserRole(id: any, idRole: any): Observable<any> {
    return this.http.put(`${this.baseURL}update-role/${id}/roles/${idRole}`, {});
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.baseURL + 'find' + id);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}delete-user/${id}`);
  }

  getAllRoles(): Observable<any> {
    return this.http.get(this.baseURL + 'all-roles');
  }
}
