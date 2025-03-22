import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IAuthService } from './interfaces/auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../../../entities/requests/register.request';
import { ApiResponse } from '../../../entities/shared/apiResponse';
import { API_URL } from '../../../../env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../../../entities/requests/login.request';
import { IJwtService } from './interfaces/jwt.interface';
import { JwtInfo, JwtService } from './jwt.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private readonly API_URL: string = `${API_URL}/auth`;
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _jwtService: IJwtService = inject(JwtService);

  public isUserAuthenticated: WritableSignal<boolean> = signal(false);
  public errorMessage: WritableSignal<string> = signal('');

  public register(
    request: RegisterRequest
  ): Observable<ApiResponse<undefined>> {
    return this._httpClient
      .put<ApiResponse<undefined>>(this.API_URL, request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public login(request: LoginRequest): Observable<ApiResponse<string>> {
    return this._httpClient
      .post<ApiResponse<string>>(this.API_URL, request)
      .pipe(
        tap((response) => {
          if (response.success) {
            this._jwtService.saveJWT(response.data);
            this.isUserAuthenticated.set(true);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public logOut(): void {
    this._jwtService.clearJWT();
    this.isUserAuthenticated.set(false);
  }

  public getUserAuthenticationStatus(): void {
    const jwt: string | null = this._jwtService.getJWT();
    if (jwt && !this._jwtService.isJWTExpired()) {
      this.isUserAuthenticated.set(true);
    }
  }

  public getUserInfo(): JwtInfo | null {
    const jwt: string | null = this._jwtService.getJWT();
    const decodedToken: JwtInfo = jwtDecode(jwt!);

    if (jwt && !this._jwtService.isJWTExpired()) {
      return decodedToken;
    }

    return null;
  }
}
