import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IUrlService } from '../modules/url/services/interfaces/url.interface';
import { UrlService } from '../modules/url/services/url.service';
import { IAuthService } from '../modules/auth/services/interfaces/auth.interface';
import { AuthService } from '../modules/auth/services/auth.service';
import { Observable, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlAccessGuard implements CanActivate {
  private readonly _urlService: IUrlService = inject(UrlService);
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const shortUrl = route.paramMap.get('shortUrl');
    const userInfo = this._authService.getUserInfo();

    if (!shortUrl || !userInfo) {
      this._router.navigateByUrl('/urls');
      return of(false);
    }

    return this._urlService.getByShortUrl(shortUrl).pipe(
      map((response) => {
        if (!response.success) {
          this._router.navigateByUrl('/urls');
          return false;
        }

        const urlOwnerId = response.data.createdBy.id;
        const isOwner = urlOwnerId.toString() === userInfo.userId;
        const isAdmin = userInfo.role === 'Admin';

        if (isOwner || isAdmin) {
          return true;
        } else {
          this._router.navigateByUrl('/urls');
          return false;
        }
      }),
      catchError(() => {
        this._router.navigateByUrl('/urls');
        return of(false);
      })
    );
  }
}
