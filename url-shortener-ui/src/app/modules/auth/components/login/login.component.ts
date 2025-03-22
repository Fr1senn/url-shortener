import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthService } from '../../services/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../../../entities/requests/login.request';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  public loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$'),
    ]),
  });
  public errorMessage = this._authService.errorMessage;

  public login(): void {
    const request: LoginRequest = {
      ...this.loginForm.value,
    };

    this._authService
      .login(request)
      .pipe(
        tap((response) => {
          if (response.success) {
            this._router.navigateByUrl('');
          }
        })
      )
      .subscribe();
  }
}
