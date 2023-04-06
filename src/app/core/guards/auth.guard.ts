import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly _service: AppService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._service.user;
    if (user) {
      // check if route is restricted by role
      if (route.data?.['roles'] && route.data?.['roles']?.indexOf(user?.roles?.roleDescription) === -1) {
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return true;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
