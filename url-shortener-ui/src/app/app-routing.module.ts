import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { UrlsComponent } from './modules/url/components/urls/urls.component';
import { UrlCreationComponent } from './modules/url/components/url-creation/url-creation.component';
import { AuthGuard } from './guards/auth.guard';
import { UrlDetailsComponent } from './modules/url/components/url-details/url-details.component';
import { UrlAccessGuard } from './guards/url-access.guard';

const routes: Routes = [
  { path: '', redirectTo: 'urls', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'urls',
    component: UrlsComponent,
    children: [
      {
        path: 'add',
        component: UrlCreationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':shortUrl',
        component: UrlDetailsComponent,
        canActivate: [AuthGuard, UrlAccessGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
