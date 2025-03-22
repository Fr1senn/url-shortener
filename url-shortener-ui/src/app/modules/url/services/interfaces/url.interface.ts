import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../entities/shared/apiResponse';
import { Url } from '../../../../entities/models/url';
import { WritableSignal } from '@angular/core';
import { UrlCreationRequest } from '../../../../entities/requests/urlCreation.request';
import { UrlEditingRequest } from '../../../../entities/requests/urlEditing.request';

export interface IUrlService {
  urls: WritableSignal<Url[]>;
  errorMessage: WritableSignal<string>;
  getAll(): Observable<ApiResponse<Url[]>>;
  create(request: UrlCreationRequest): Observable<ApiResponse<undefined>>;
  getByShortUrl(shortUrl: string): Observable<ApiResponse<Url>>;
  delete(urlId: number): Observable<ApiResponse<undefined>>;
  edit(request: UrlEditingRequest): Observable<ApiResponse<undefined>>;
}
