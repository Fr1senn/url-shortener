import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { IAuthService } from '../../services/interfaces/auth.interface';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../../entities/requests/register.request';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly _authService: IAuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  public registerForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$'),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$'),
    ]),
  });
  public errorMessage = this._authService.errorMessage;

  public register(): void {
    const request: RegisterRequest = {
      ...this.registerForm.value,
    };

    this._authService
      .register(request)
      .pipe(
        tap((response) => {
          if (response.success) {
            this._authService
              .login({
                login: request.login,
                password: request.password,
              })
              .pipe(
                tap((response) => {
                  if (response.success) {
                    this._router.navigateByUrl('');
                  }
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }
}
