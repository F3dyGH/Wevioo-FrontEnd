import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../auth/services/storage/storage.service";
import {AuthService} from "../../auth/services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {
  private baseURL = 'http://localhost:8082/api/admin/'

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  getHeader(): any{
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Bearer '+ token
    });

    return headers;

  }
  getAllUsers(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'all-users', {headers});
  }

  updateUserRole(id: any, idRole: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.put(this.baseURL+'update-role/'+ id +'/roles/' + idRole, {}, {headers});
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.baseURL + 'find' + id);
  }

  deleteUser(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.delete(this.baseURL +'delete-user' + id, {headers});
  }

  getAllRoles(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.baseURL + 'all-roles', {headers});
  }
}
