import { NgModule } from '@angular/core';
import { StylingGuidePageComponent } from './pages/styling-guide/styling-guide-page.component';
import { RouterModule } from '@angular/router';
import { DialogsPageComponent } from './pages/dialogs/dialogs-page.component';

const sandboxRoutes = [
  {
    path: 'dialogs',
    component: DialogsPageComponent,
  },
  {
    path: 'styling-guide',
    component: StylingGuidePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(sandboxRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SandboxFeatureRoutingModule {
};
