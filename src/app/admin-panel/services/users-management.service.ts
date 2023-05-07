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
  private authURL = 'http://localhost:8082/api/auth/'
  private userURL = 'http://localhost:8082/api/user/'
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
  getEnabledUsers(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'enabled-users', {headers});
  }
  getDisabledUsers(): Observable<any> {
    const headers = this.getHeader();
    console.log(headers);
    return this.http.get(this.baseURL + 'disabled-users', {headers});
  }

  updateUserRole(id: any, idRole: any): Observable<any> {
    const headers = this.getHeader();
    const headersd = this.getHeader().value;
    console.log(headersd)
    return this.http.put(this.baseURL+'update-role/'+ id +'/roles/' + idRole, {}, {headers});
  }

  getUser(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.authURL + 'find/' + id,{headers});
  }

  disableUser(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.put(this.baseURL +'disable/' + id, {},{headers});
  }
  enableUser(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.put(this.baseURL +'enable/' + id, {},{headers});
  }

  getPhoto(photoName: any): Observable<any> {
    const headers = this.getHeader();

    return this.http.get(this.userURL + "photo/" + photoName, {responseType: 'blob', headers});
  }

  getAllRoles(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get(this.baseURL + 'all-roles', {headers});
  }
}
