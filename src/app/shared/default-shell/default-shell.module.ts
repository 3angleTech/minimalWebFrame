/**
 * Use the `MinimalShellComponent` to provide a structure around application pages that require
 * a minimal amount of structure. E.g.: login or 404 page.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '~shared/core';

import { DefaultShellComponent } from './components/default-shell/default-shell.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';

const COMPONENTS = [
  NavigationMenuComponent,
  DefaultShellComponent,
];

@NgModule({
  imports: [
    RouterModule,
    CoreModule,
  ],
  declarations: [
    COMPONENTS,
  ],
})
export class DefaultShellModule { }
