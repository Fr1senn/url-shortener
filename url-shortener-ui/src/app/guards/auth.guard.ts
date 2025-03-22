import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { IAuthService } from '../modules/auth/services/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this._authService.isUserAuthenticated()) {
      return of(true);
    }
    this._router.navigate(['login']);
    return of(false);
  }
}
