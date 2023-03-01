import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {StorageService} from "../../auth/services/storage/storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storageService.isLoggedIn() && this.storageService.getUser().roles == "ROLE_ADMIN") {
      return true;
    } else {
      if (this.storageService.getUser().roles == "ROLE_STAFF") {
        return this.router.navigate(['staff']);
      } else {
        return this.router.navigate(['']);
      }
    }
  }
}
