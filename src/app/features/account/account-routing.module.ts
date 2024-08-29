import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard, AuthenticatedGuard } from '~shared/security';

import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LogoutPageComponent } from './pages/logout/logout-page.component';
import { PasswordForgotPageComponent } from './pages/password-forgot/password-forgot-page.component';
import { PasswordResetPageComponent } from './pages/password-reset/password-reset-page.component';

const routes: Routes = [
  {
    path: '',
    component: AccountShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [
          AnonymousGuard,
        ],
      },
      {
        path: 'logout',
        component: LogoutPageComponent,
        canActivate: [
          AuthenticatedGuard,
        ],
      },
      {
        path: 'forgot-password',
        component: PasswordForgotPageComponent,
        canActivate: [
          AnonymousGuard,
        ],
      },
      {
        path: 'reset-password',
        component: PasswordResetPageComponent,
        canActivate: [
          AnonymousGuard,
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {
}
