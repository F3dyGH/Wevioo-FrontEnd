import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {environment} from "../../../../environments/environment.development";
import {interval, Observable, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseURL: string;
  private lastPollTimestamp: string = '';
  private currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = environment.apiUrl + 'notifications/'
    this.currentUser = this.authService.getUserId();
  }

  getHeader(): any {
    const token = this.authService.getaccessToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }


  public startPolling(): Observable<any> {
    return interval(1000)
      .pipe(
        switchMap(() => this.pollNotifications(this.currentUser))
      );
  }

  private pollNotifications(id: any): Observable<any[]> {
    const headers = this.getHeader();

    return this.http.get<any[]>(this.baseURL + id, {headers})
      .pipe(
        tap((newNotifications: any[]) => {
          if (newNotifications && newNotifications.length > 0) {
            const latestNotification = newNotifications[newNotifications.length - 1];
            this.lastPollTimestamp = latestNotification.dateTime;
          }
        })
      );
  }

  public setNotificationsToSeen(id: any): Observable<any> {
    const headers = this.getHeader();
    return this.http.put(this.baseURL + id + '/seen', {headers});
  }
}
