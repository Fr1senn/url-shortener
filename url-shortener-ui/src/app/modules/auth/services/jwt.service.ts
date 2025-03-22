import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import { IJwtService } from './interfaces/jwt.interface';

export type JwtInfo = JwtPayload & {
  userId: string;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class JwtService implements IJwtService {
  private readonly _cookieService: CookieService = inject(CookieService);

  public getJWT(): string | null {
    const jwt: string | null = this._cookieService.get('jwt');
    return jwt;
  }

  public saveJWT(jwt: string): void {
    this._cookieService.set('jwt', jwt, { path: '/' });
  }

  public clearJWT(): void {
    this._cookieService.delete('jwt', '/');
  }

  public isJWTExpired(): boolean {
    const jwt: string | null = this.getJWT();

    if (!jwt) {
      return true;
    }

    try {
      const decodedToken: JwtInfo = jwtDecode(jwt);
      const expirationTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      return expirationTime! <= currentTime;
    } catch (error) {
      console.error(error);
      return true;
    }
  }
}
