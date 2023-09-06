import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard, AuthenticatedGuard } from '~shared/security';

import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

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
        component: LoginComponent,
        canActivate: [
          AnonymousGuard,
        ],
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [
          AuthenticatedGuard,
        ],
      },
      {
        path: 'forgot-password',
        component: PasswordForgotComponent,
        canActivate: [
          AnonymousGuard,
        ],
      },
      {
        path: 'reset-password',
        component: PasswordResetComponent,
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
