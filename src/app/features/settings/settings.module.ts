import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { SettingsPageComponent } from './pages/profile/settigns-page.component';
import { ProfileRoutingModule } from './settings-routing.module';
import { PageTopBarModule } from '~shared/core/components/page-top-bar/page-top-bar.module';

const COMPONENTS = [
  SettingsPageComponent,
];

@NgModule({
  imports: [
    CoreModule,
    ProfileRoutingModule,
    PageTopBarModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class SettingsModule { }
