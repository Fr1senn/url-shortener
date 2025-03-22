import { Component, inject, OnInit } from '@angular/core';
import { IUrlService } from '../../services/interfaces/url.interface';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-urls',
  standalone: false,
  templateUrl: './urls.component.html',
})
export class UrlsComponent implements OnInit {
  private readonly _urlService: IUrlService = inject(UrlService);

  public urls = this._urlService.urls;

  public ngOnInit(): void {
    this.getUrls();
  }

  private getUrls(): void {
    this._urlService.getAll().subscribe();
  }
}
