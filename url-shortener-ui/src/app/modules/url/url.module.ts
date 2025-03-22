import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlsComponent } from './components/urls/urls.component';
import { UrlCreationComponent } from './components/url-creation/url-creation.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlDetailsComponent } from './components/url-details/url-details.component';

@NgModule({
  declarations: [UrlsComponent, UrlCreationComponent, UrlDetailsComponent],
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
})
export class UrlModule {}
