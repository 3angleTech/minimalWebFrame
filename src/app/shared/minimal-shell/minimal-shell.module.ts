/**
 * Use the `MinimalShellComponent` to provide a structure around application pages that require
 * a minimal amount of structure. E.g.: login or 404 page.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '~shared/core';

import { MinimalShellLayoutComponent } from './components/minimal-shell-layout/minimal-shell-layout.component';

@NgModule({
  imports: [
    RouterModule,
    CoreModule,
  ],
  declarations: [
    MinimalShellLayoutComponent,
  ],
})
export class MinimalShellModule { }
