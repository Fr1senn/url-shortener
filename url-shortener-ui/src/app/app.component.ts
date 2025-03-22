import { Component, inject, OnInit } from '@angular/core';
import { IAuthService } from './modules/auth/services/interfaces/auth.interface';
import { AuthService } from './modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  public isUserAuthenticated = this._authService.isUserAuthenticated;

  public ngOnInit(): void {
    this._authService.getUserAuthenticationStatus();
  }

  public logOut(): void {
    this._authService.logOut();
    this._router.navigateByUrl('');
  }
}
