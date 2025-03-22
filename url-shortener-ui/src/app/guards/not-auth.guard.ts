import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../modules/auth/services/auth.service';
import { IAuthService } from '../modules/auth/services/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (!this._authService.isUserAuthenticated()) {
      return true;
    }
    this._router.navigate(['']);
    return false;
  }
}
