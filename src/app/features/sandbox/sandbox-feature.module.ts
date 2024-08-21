import { NgModule } from '@angular/core';
import { CoreModule } from '~shared/core';
import { SandboxFeatureRoutingModule } from './sandbox-feature-routing.module';
import { DialogsPageComponent } from './pages/dialogs/dialogs-page.component';
import { TypographyPageComponent } from './pages/typography/typography-page.component';

const COMPONENTS = [
  DialogsPageComponent,
  TypographyPageComponent,
];

@NgModule({
  imports: [
    CoreModule,
    SandboxFeatureRoutingModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class SandboxFeatureModule { }
