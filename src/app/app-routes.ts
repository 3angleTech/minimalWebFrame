import { Routes } from '@angular/router';

import { DefaultShellComponent } from '~shared/default-shell';
import { MinimalShellComponent } from '~shared/minimal-shell';
import { AuthenticatedGuard } from '~shared/security';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: '',
    component: MinimalShellComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./features/account').then(m => m.AccountModule),
        runGuardsAndResolvers: 'always',
      },
    ],
  },
  {
    path: '',
    component: DefaultShellComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./features/profile').then(m => m.ProfileModule),
        runGuardsAndResolvers: 'always',
      },
    ],
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
];
