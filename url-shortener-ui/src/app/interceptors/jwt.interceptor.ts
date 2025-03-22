import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/services/auth.service';
import { IAuthService } from '../modules/auth/services/interfaces/auth.interface';
import { IJwtService } from '../modules/auth/services/interfaces/jwt.interface';
import { JwtService } from '../modules/auth/services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _jwtService: IJwtService = inject(JwtService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this._jwtService.getJWT();

    if (jwt && this._authService.isUserAuthenticated()) {
      request = this.addTokenToRequest(request, jwt);
    }

    return next.handle(request);
  }

  private addTokenToRequest(
    request: HttpRequest<unknown>,
    jwt: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}
