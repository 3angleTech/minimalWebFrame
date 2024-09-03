import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { ProfileComponent } from './pages/profile/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PageTopBarModule } from '~shared/core/components/page-top-bar/page-top-bar.module';

const COMPONENTS = [
  ProfileComponent,
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
export class ProfileModule { }
