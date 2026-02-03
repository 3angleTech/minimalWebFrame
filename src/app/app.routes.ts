import { Routes } from '@angular/router';
import { MainShellLayoutComponent } from '~shared/main-shell';
import { MinimalShellLayoutComponent } from '~shared/minimal-shell';
import { AuthenticatedGuard } from '~shared/security';

export const routes: Routes = [
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
        loadChildren: () => import('./features/account/account.routes'),
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
        loadChildren: () => import('./features/profile/profile.routes'),
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes'),
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'sandbox',
        loadChildren: () => import('./features/sandbox/sandbox-feature.routes'),
        runGuardsAndResolvers: 'always',
      },
    ],
    canActivate: [AuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
];
