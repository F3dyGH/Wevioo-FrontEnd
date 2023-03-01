import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.storageService.isLoggedIn()) {
      return true;
    }else{
      return this.router.navigate(['login']);
    }
  }
}
