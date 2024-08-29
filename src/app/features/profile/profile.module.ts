import { NgModule } from '@angular/core';

import { CoreModule } from '~shared/core';

import { ProfileComponent } from './pages/profile/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';

const COMPONENTS = [
  ProfileComponent,
];

@NgModule({
  imports: [
    CoreModule,
    ProfileRoutingModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class ProfileModule { }
