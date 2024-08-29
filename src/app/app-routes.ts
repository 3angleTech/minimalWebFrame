import { Routes } from '@angular/router';
import { MainShellLayoutComponent } from '~shared/main-shell';
import { MinimalShellLayoutComponent } from '~shared/minimal-shell';

import { AuthenticatedGuard } from '~shared/security';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: '',
    component: MinimalShellLayoutComponent,
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
    component: MainShellLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./features/profile').then(m => m.ProfileModule),
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'sandbox',
        loadChildren: () => import('./features/sandbox').then(m => m.SandboxFeatureModule),
        runGuardsAndResolvers: 'always',
      },
    ],
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
];
