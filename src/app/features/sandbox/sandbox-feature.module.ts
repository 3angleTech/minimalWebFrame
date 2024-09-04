import { NgModule } from '@angular/core';
import { CoreModule } from '~shared/core';
import { SandboxFeatureRoutingModule } from './sandbox-feature-routing.module';
import { DialogsPageComponent } from './pages/dialogs/dialogs-page.component';
import { TypographyPageComponent } from './pages/typography/typography-page.component';
import { PageTopBarModule } from '~shared/core/components/page-top-bar/page-top-bar.module';
import { ModalDialogsModule } from '~shared/core/components/modal-dialog/modal-dialog.module';

const COMPONENTS = [
  DialogsPageComponent,
  TypographyPageComponent,
];

@NgModule({
  imports: [
    CoreModule,
    SandboxFeatureRoutingModule,
    PageTopBarModule,
    ModalDialogsModule,
  ],
  declarations: [
    COMPONENTS,
  ],
  providers: [],
})
export class SandboxFeatureModule { }
