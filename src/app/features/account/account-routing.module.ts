import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MinimalShellComponent } from '~shared/minimal-shell';
import { AnonymousGuard } from '~shared/security';

import { AccountShellComponent } from './components/account-shell/account-shell.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MinimalShellComponent,
    children: [
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
