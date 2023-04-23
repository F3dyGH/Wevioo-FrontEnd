import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../auth/services/auth/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'http://localhost:8082/api/user/'

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

  updateUser(req: any, photo: FileList): Observable<any> {
    const token = this.authService.getaccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log(req)
    const id = this.authService.getUserId();
    console.log(id)
    const userMultipartFormParam = 'user';
    const photoMultipartFormParam = 'photo';
    const formData: FormData = new FormData();
    const userAsJsonBlob: Blob = new Blob([JSON.stringify(req)], {type: 'application/json'});
    formData.append(userMultipartFormParam, userAsJsonBlob);

    const filesAsArray = Array.from(photo)
    formData.append(photoMultipartFormParam, filesAsArray[0]);

    return this.http.put(this.baseURL + 'update/' + id, formData, httpOptions)
  }

  getPhoto(photoName: any): Observable<any> {
    const token = this.authService.getaccessToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.baseURL + "photo/" + photoName, httpOptions);
  }
}
