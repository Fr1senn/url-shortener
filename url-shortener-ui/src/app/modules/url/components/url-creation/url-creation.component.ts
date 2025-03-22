import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlCreationRequest } from '../../../../entities/requests/urlCreation.request';
import { IUrlService } from '../../services/interfaces/url.interface';
import { UrlService } from '../../services/url.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-url-creation',
  standalone: false,
  templateUrl: './url-creation.component.html',
})
export class UrlCreationComponent {
  private readonly _urlService: IUrlService = inject(UrlService);
  private readonly _router: Router = inject(Router);

  public urlCreationForm: FormGroup = new FormGroup({
    url: new FormControl('', Validators.required),
  });
  public errorMessage = this._urlService.errorMessage;

  public create(): void {
    const request: UrlCreationRequest = {
      ...this.urlCreationForm.value,
    };

    this._urlService
      .create(request)
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
