import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        withCredentials: true,
        /*setHeaders: {
          Authorization: 'Bearer ${token}'
        }*/
      });
    }
    return next.handle(req);
  }
}

export const JwtInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
];
