import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {StorageService} from "../../auth/services/storage/storage.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaffGuardService implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storageService.isLoggedIn() && this.storageService.getUser().roles == "ROLE_STAFF") {
      return true;
    } else {
      if (this.storageService.getUser().roles == "ROLE_ADMIN") {
        return this.router.navigate(['admin']);
      } else {
        return this.router.navigate(['']);
      }
    }
  }
}
