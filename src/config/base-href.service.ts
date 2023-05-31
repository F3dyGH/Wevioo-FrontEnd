import { Injectable } from '@angular/core';
import { APP_BASE_HREF, Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseHrefService {

  constructor(private location: Location) {
  }

  updateBaseHref(): void {
    const currentUrl = this.location.path();
    const baseHref = currentUrl === '' ? '/' : currentUrl;
    (window as any).__webpack_public_path__ = baseHref;
    (window as any).__PUBLIC_PATH__ = baseHref;
    (window as any).__DEV__ = true;
    (window as any).__PRODUCTION__ = false;
    (window as any).__BASE_HREF__ = baseHref;
    document.querySelector('base')?.setAttribute('href', baseHref);
  }
}
