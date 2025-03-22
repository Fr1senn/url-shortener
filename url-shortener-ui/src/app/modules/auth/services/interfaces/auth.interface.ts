import { Observable } from 'rxjs';
import { RegisterRequest } from '../../../../entities/requests/register.request';
import { ApiResponse } from '../../../../entities/shared/apiResponse';
import { LoginRequest } from '../../../../entities/requests/login.request';
import { WritableSignal } from '@angular/core';
import { JwtInfo } from '../jwt.service';

export interface IAuthService {
  isUserAuthenticated: WritableSignal<boolean>;
  errorMessage: WritableSignal<string>;
  register(request: RegisterRequest): Observable<ApiResponse<undefined>>;
  login(request: LoginRequest): Observable<ApiResponse<string>>;
  logOut(): void;
  getUserAuthenticationStatus(): void;

  getUserInfo(): JwtInfo | null;
}
