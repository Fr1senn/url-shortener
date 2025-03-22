import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IUrlService } from './interfaces/url.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Url } from '../../../entities/models/url';
import { ApiResponse } from '../../../entities/shared/apiResponse';
import { API_URL } from '../../../../env';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UrlCreationRequest } from '../../../entities/requests/urlCreation.request';
import { UrlEditingRequest } from '../../../entities/requests/urlEditing.request';

@Injectable({
  providedIn: 'root',
})
export class UrlService implements IUrlService {
  private readonly API_URL: string = `${API_URL}/url`;
  private readonly _httpClient: HttpClient = inject(HttpClient);

  public urls: WritableSignal<Url[]> = signal([]);
  public errorMessage: WritableSignal<string> = signal('');

  public edit(request: UrlEditingRequest): Observable<ApiResponse<undefined>> {
    return this._httpClient
      .patch<ApiResponse<undefined>>(this.API_URL, request)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.urls.set(
              this.urls().map((url) =>
                url.id === request.id ? { ...url, ...request } : url
              )
            );
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public getAll(): Observable<ApiResponse<Url[]>> {
    return this._httpClient.get<ApiResponse<Url[]>>(`${this.API_URL}/all`).pipe(
      tap((response) => {
        if (response.success) {
          this.urls.set(response.data);
        }
      })
    );
  }

  public create(
    request: UrlCreationRequest
  ): Observable<ApiResponse<undefined>> {
    return this._httpClient
      .put<ApiResponse<undefined>>(this.API_URL, request)
      .pipe(
        tap((response) => {
          if (response.success) {
            ``;
            this.getAll().subscribe();
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public getByShortUrl(shortUrl: string): Observable<ApiResponse<Url>> {
    return this._httpClient
      .get<ApiResponse<Url>>(this.API_URL, {
        params: { shortUrl },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }

  public delete(urlId: number): Observable<ApiResponse<undefined>> {
    return this._httpClient
      .delete<ApiResponse<undefined>>(this.API_URL, {
        params: { urlId },
      })
      .pipe(
        tap((response) => {
          if (response.success)
            this.urls.set(this.urls().filter((url) => url.id !== urlId));
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage.set(error.error.message);
          return throwError(() => error);
        })
      );
  }
}
