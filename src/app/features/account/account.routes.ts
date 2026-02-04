import { Routes } from '@angular/router';
import { AnonymousGuard, AuthenticatedGuard } from '~shared/security';
import { AccountShellComponent } from './components/account-shell/account-shell.component';

export default [
  {
    path: '',
    component: AccountShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login-page.component').then(m => m.LoginPageComponent),
        canActivate: [AnonymousGuard],
      },
      {
        path: 'logout',
        loadComponent: () => import('./pages/logout/logout-page.component').then(m => m.LogoutPageComponent),
        canActivate: [AuthenticatedGuard],
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/password-forgot/password-forgot-page.component').then(m => m.PasswordForgotPageComponent),
        canActivate: [AnonymousGuard],
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/password-reset/password-reset-page.component').then(m => m.PasswordResetPageComponent),
        canActivate: [AnonymousGuard],
      },
    ],
  },
] as Routes;
