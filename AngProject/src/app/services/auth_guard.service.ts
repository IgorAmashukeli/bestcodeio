import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { NavigationExtras } from '@angular/router';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    const navigationExtras: NavigationExtras = {
      state: { yourData: true },
    };

    const redirect = navigationExtras.state
      ? navigationExtras.state['yourData']
      : false;
    return router.createUrlTree(['/' + redirect], navigationExtras);
  }
};
