import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUrlService } from '../../services/interfaces/url.interface';
import { UrlService } from '../../services/url.service';
import { Url } from '../../../../entities/models/url';
import { IAuthService } from '../../../auth/services/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtInfo } from '../../../auth/services/jwt.service';
import { tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlEditingRequest } from '../../../../entities/requests/urlEditing.request';

@Component({
  selector: 'app-url-details',
  standalone: false,
  templateUrl: './url-details.component.html',
})
export class UrlDetailsComponent implements OnInit {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private readonly _urlService: IUrlService = inject(UrlService);
  private readonly _authService: IAuthService = inject(AuthService);

  public url!: Url;
  public errorMessage = this._urlService.errorMessage;
  public userInfo: JwtInfo | null = null;
  public isEditing: boolean = false;
  public urlEditingForm: FormGroup = new FormGroup({
    url: new FormControl('', Validators.required),
  });

  public ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const shortUrl = params.get('shortUrl');
      if (shortUrl) {
        this.getUrl(shortUrl);
      } else {
        this._router.navigateByUrl('');
      }
    });
    this.userInfo = this._authService.getUserInfo();
  }

  public edit(): void {
    const request: UrlEditingRequest = {
      id: this.url.id,
      ...this.urlEditingForm.value,
    };

    this._urlService
      .edit(request)
      .pipe(
        tap((response) => {
          if (response.success) {
            this._urlService.getAll().subscribe();
            this.isEditing = false;
          }
        })
      )
      .subscribe();
  }

  public delete(): void {
    this._urlService
      .delete(this.url.id)
      .pipe(
        tap((response) => {
          if (response.success) {
            this._urlService.getAll().subscribe();
            this._router.navigateByUrl('');
          }
        })
      )
      .subscribe();
  }

  private getUrl(shortUrl: string): void {
    this._urlService.getByShortUrl(shortUrl).subscribe((response) => {
      if (response.success) {
        this.url = response.data;
      } else {
        this._router.navigateByUrl('');
      }
    });
  }
}
