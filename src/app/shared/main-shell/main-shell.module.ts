/**
 * Use the `MinimalShellComponent` to provide a structure around application pages that require
 * a minimal amount of structure. E.g.: login or 404 page.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '~shared/core';

import { MainShellLayoutComponent } from './components/main-shell-layout/main-shell-layout.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const COMPONENTS = [
  NavigationMenuComponent,
  MainShellLayoutComponent,
];

@NgModule({
  imports: [
    RouterModule,
    CoreModule,
    FontAwesomeModule,
  ],
  declarations: [
    COMPONENTS,
  ],
})
export class MainShellModule { }
